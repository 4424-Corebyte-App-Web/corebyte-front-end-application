<script>
    export default {
        name: "Language-switcher",
        data() {
            return {
                languages: []
            }
        },
    created()
    {
        this.languages = this.$i18n.availableLocales;
    }
}
</script>
<template>
    <pv-selectbutton v-model="$i18n.locale" :options="languages">
        <template #option ="slotProps">
            {{slotProps.option.toUpperCase()}}
        </template>
    </pv-selectbutton>
</template>
<style scoped></style>