
<template>
    <!-- eslint-disable vue/require-component-is -->
    <component v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
    import { isExternal } from '@/utils/validate'

    export default {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        methods: {
            linkProps(url) {
                console.log(url,'123')
                if (isExternal(url)) {
                    console.log(url,'urle')
                    return {
                        is: 'a',
                        href: url,
                        target: '_blank',
                        rel: 'noopener'
                    }
                }
                return {
                    is: 'router-link',
                    to: url
                }
            }
        }
    }
</script>
