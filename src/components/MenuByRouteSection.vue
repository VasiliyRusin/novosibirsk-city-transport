<template>
    <section>
        <h1>
            По маршруту
        </h1>
        <form>
            <div>
                <div>
                    <label>
                        <NInput type="search"></NInput>
                    </label>
                    <label>
                        <NInput type="search"></NInput>
                    </label>
                </div>
                <div>
                    <button></button>
                </div>
            </div>
            <div>
                <button></button>
            </div>
        </form>
    </section>
</template>

<script>
  import NInput from "@/components/ui/NInput";
  
  export default {
    name: "MenuByRouteSection",
    components: { NInput }
  };
</script>

<style scoped lang="scss">

</style>
