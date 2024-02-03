<script>
  import Chip from '$lib/components/Chip/Chip.svelte';
  import CommonPage from '$lib/components/CommonPage.svelte';
  import { RESUME } from '$lib/params';

  const { item, title } = RESUME;
</script>

<CommonPage {title}>
  <div class="resume">
    {#if item}
      <a href={item} title="Download Resume">
        <Chip size={'1.25em'} alt="Download Icon">Download</Chip>
      </a>
    {:else}
      <Chip>Ooops! No CV at the moment.</Chip>
    {/if}
  </div>
</CommonPage>

<style lang="scss">
  .resume {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    & > a {
      color: inherit;
    }
  }
</style>
