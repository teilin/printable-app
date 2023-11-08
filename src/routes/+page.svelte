<script>
    export let form;
    console.log(form);
</script>

{#if form?.error}
<h2>Failed to upload. Only PDF files supported.</h2>
{/if}

<h1 class="text-white text-center">Is it printable?</h1>

<div class="container">
    <form method="POST" action="?/upload" enctype="multipart/form-data">
        <div>
            <label for="file" class="form-label">File to check</label>
            <input class="form-control form-control-lg" id="file" name="file" type="file" accept="application/pdf">
            <button type="submit" class="file-submit btn btn-light">Check</button>
        </div>
    </form>
</div>

{#if form?.success}
    <div class="container text-center mx-auto p-2 text-light">
        <div class="row">
            <div class="col">
                For print
            </div>
            <div class="col">
                For web
            </div>
            <div class="col">
                Pages
            </div>
            <div class="col">
                Errors
            </div>
        </div>
        <div class="row">
            <div class="col">
                {form?.data.okForPrint}
            </div>
            <div class="col">
                {form?.data.okForWeb}
            </div>
            <div class="col">
                {form?.data.pages}
            </div>
            <div class="col">
                <ul>
                {#each form?.data.errors as error}
                    <li>{error}</li>
                {/each}
                </ul>
            </div>
        </div>
    </div> 
{/if}

<style>
</style>