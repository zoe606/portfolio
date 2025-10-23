<script lang="ts">
	import { base } from '$app/paths';
	import { Badge } from '$lib/components/ui';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import { RESUME } from '$lib/params';
	import { onDestroy, onMount, tick } from 'svelte';

	const { item, title, description } = RESUME;
	const resolvedSrc = item ? `${base}${item}` : undefined;

	let container: HTMLDivElement | null = null;
	let pages: Array<number> = [];
	let isRendering = false;
	let renderProgress = 0;
	let errorMessage: string | null = null;

	let renderToken = 0;

	const resetViewer = () => {
		pages = [];
		renderProgress = 0;
		isRendering = false;
		errorMessage = null;
	};

	const loadPdf = async (url: string, token: number) => {
		try {
			const [{ getDocument, GlobalWorkerOptions }, workerModule] = await Promise.all([
				import('pdfjs-dist'),
				import('pdfjs-dist/build/pdf.worker.mjs?url')
			]);

			const workerSrc =
				(workerModule as { default?: string }).default ?? (workerModule as unknown as string);

			GlobalWorkerOptions.workerSrc = workerSrc;

			const loadingTask = getDocument({
				url,
				withCredentials: false
			});

			const pdf = await loadingTask.promise;

			if (token !== renderToken) {
				loadingTask.destroy();
				return;
			}

			pages = Array.from({ length: pdf.numPages }, (_, index) => index + 1);
			await tick();

			for (const pageNumber of pages) {
				if (token !== renderToken) {
					break;
				}

				const page = await pdf.getPage(pageNumber);
				const viewport = page.getViewport({ scale: 1.25 });

				const canvas = container?.querySelector<HTMLCanvasElement>(
					`canvas[data-page="${pageNumber}"]`
				);

				if (!canvas) {
					continue;
				}

				const context = canvas.getContext('2d');
				if (!context) {
					continue;
				}

				canvas.height = viewport.height;
				canvas.width = viewport.width;

				renderProgress = pageNumber;
				await page.render({ canvasContext: context, viewport }).promise;
			}

			if (token === renderToken) {
				isRendering = false;
				renderProgress = pages.length;
			}

			if (typeof pdf.cleanup === 'function') {
				await pdf.cleanup();
			}
			if (typeof loadingTask.destroy === 'function') {
				loadingTask.destroy();
			}
		} catch (error) {
			if (token === renderToken) {
				errorMessage =
					error instanceof Error
						? error.message
						: 'Unable to preview PDF. Please try downloading instead.';
				isRendering = false;
			}
		}
	};

	const renderResume = async () => {
		if (!resolvedSrc) {
			errorMessage = 'No resume available at the moment.';
			return;
		}

		resetViewer();
		isRendering = true;
		renderToken += 1;
		const token = renderToken;
		await loadPdf(resolvedSrc, token);
	};

	onMount(() => {
		void renderResume();
	});

	onDestroy(() => {
		renderToken += 1;
	});
</script>

<TabTitle {title} {description} path="/resume" />
<CommonPage {title}>
	{#if resolvedSrc}
		<div class="resume-actions">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={resolvedSrc} download title="Download resume">
				<Badge class="text-1em">Download PDF</Badge>
			</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={resolvedSrc} target="_blank" rel="noreferrer" title="Open in new tab">
				<Badge variant="outline" class="text-1em">Open in new tab</Badge>
			</a>
		</div>

		<div class="resume-viewer">
			{#if errorMessage}
				<div class="resume-error">
					<p>{errorMessage}</p>
				</div>
			{:else}
				<div class="resume-canvas" bind:this={container}>
					{#each pages as page (page)}
						<div class="page-wrapper">
							<canvas data-page={page}></canvas>
						</div>
					{/each}
					{#if isRendering}
						<div class="resume-loading">
							<p>Rendering page {renderProgress + 1} of {pages.length || '...'}</p>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{:else}
		<div class="resume-empty">
			<p>No resume available at the moment.</p>
		</div>
	{/if}
</CommonPage>

<style lang="scss">
	.resume-actions {
		display: flex;
		gap: 12px;
		justify-content: center;
		margin: 16px 0 24px;

		a {
			text-decoration: none;
		}

		@media (max-width: 640px) {
			flex-direction: column;

			a {
				width: 100%;
				display: flex;
				justify-content: center;
			}
		}
	}

	.resume-viewer {
		position: relative;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--main);
		padding: 16px;
		display: flex;
		justify-content: center;
	}

	.resume-canvas {
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: center;
		width: 100%;
	}

	.page-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;

		canvas {
			max-width: 100%;
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
			border-radius: 8px;
			background: #fff;
		}
	}

	.resume-loading {
		display: flex;
		justify-content: center;
		color: var(--accent-text);
		font-size: 0.95rem;
		padding: 12px 0;
	}

	.resume-error {
		color: var(--accent-text);
		font-size: 1rem;
		text-align: center;
		padding: 40px 16px;
	}

	.resume-empty {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
		color: var(--accent-text);
		font-weight: 300;
		text-align: center;
	}
</style>
