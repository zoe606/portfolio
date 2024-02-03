<script lang="ts">
  import { countMonths, getMonthName, getTimeDiff } from '$lib/utils/helpers';
  import Chip from '../Chip/Chip.svelte';
  import Card from '../Card/Card.svelte';
  import CardTitle from '../Card/CardTitle.svelte';
  import CardLink from '../Card/CardLink.svelte';
  import CardDivider from '../Card/CardDivider.svelte';
  import ChipIcon from '../Chip/ChipIcon.svelte';
  import CardLogo from '../Card/CardLogo.svelte';
  import type { Project } from '$lib/types';
  import { getAssetURL } from '$lib/data/assets';
  import { base } from '$app/paths';

  export let project: Project;

  // Calculate the display period
  let months: number;
  let period: string;
  let from: string;
  let to: string;

  $: {
    months = countMonths(project.period.from, project.period.to);
    period = `${getTimeDiff(project.period.from, project.period.to ?? new Date(Date.now() + 1000 * 60 * 60 * 24))}`;
    from = `${getMonthName(project.period.from.getMonth())} ${project.period.from.getFullYear()}`;
    to = project.period.to
      ? `${getMonthName(project.period.to.getMonth())} ${project.period.to.getFullYear()}`
      : 'Now';
  }
</script>

<Card color={project.color} href={`${base}/projects/${project.slug}`}>
  <!-- Lazy-loaded image -->
  <CardLogo alt={project.name} src={getAssetURL(project.logo)} size={40} radius={'0'} />

  <div class="m-t-20px row justify-between items-center">
    <CardTitle title={project.name} />
    
    <!-- Conditional rendering of links -->
    {#if project.links.length > 0}
      <div class="row">
        {#each project.links as link}
          <CardLink label={link.label ?? ''} to={link.to} />
        {/each}
      </div>
    {/if}
  </div>

  <CardDivider />

  <div class="row m-b-15px justify-between text-[var(--secondary-text)] text-0.9em font-italic font-300">
    <p>{project.type}</p>
    <p>{period}</p>
  </div>

  <p class="text-[0.95em] text-[var(--secondary-text)] font-300 m-t-20px m-b-40px flex-1">
    {project.shortDescription}
  </p>

  <!-- Conditional rendering of 'to' Chip -->
  <div class="row justify-between text-0.8em font-400">
    <Chip>{from}</Chip>
    {#if from !== to}
      <Chip>{to}</Chip>
    {/if}
  </div>

  <CardDivider />

  <div class="row">
    <!-- Lazy-loaded ChipIcons -->
    {#each project.skills as tech}
      <ChipIcon logo={getAssetURL(tech.logo)} name={tech.name} href={`${base}/skills/${tech.slug}`} />
    {/each}
  </div>
</Card>
