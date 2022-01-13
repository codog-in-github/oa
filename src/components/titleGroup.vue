<template>
    <div>
        <div class="title">{{title}}</div>
        <slot>
            noData
        </slot>
    </div>
</template>
<script>

export default ({
    props: ['title']
})
</script>
