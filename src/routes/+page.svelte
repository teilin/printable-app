<script>
    export let form;
</script>

<h1 class="text-white text-center">Is it printable?</h1>

{#if form?.error}
<h2>Failed to upload. Only PDF files supported.</h2>
    <div class="container alert alert-danger" role="alert">
        <p>Failed to upload. Only PDF files supported.</p>
        <p>{form?.message}</p>
    </div>
{/if}

<div class="container">
    <form method="POST" action="?/upload" enctype="multipart/form-data">
        <div class="input-group">
            <input class="form-control form-control-lg" id="file" name="file" type="file" accept="application/pdf">
            <div class="input-group-text"><button type="submit" class="file-submit btn btn-light">Check</button></div>
        </div>
    </form>
</div>

{#if form?.success}
    <div class="container text-center mx-auto p-2 text-light col-3">
        <table class="table">
            <tbody>
                <tr>
                    <th scope="row">For print</th>
                    <td>{#if form?.data.okForPrint}✔️{:else}❌{/if}</td>
                </tr>
                <tr>
                    <th scope="row">For web</th>
                    <td>{#if form?.data.okForWeb}✔️{:else}❌{/if}</td>
                </tr>
                <tr>
                    <th scope="row"># pages</th>
                    <td>{form?.data.pages}</td>
                </tr>
                <tr>
                    <th scope="row">Errors</th>
                    <td>
                        <ul>
                            {#each form?.data.errors as error}
                                <li>{error}</li>
                            {/each}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div> 
{/if}

<style>
</style>