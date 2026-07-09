import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webfontDownload from 'vite-plugin-webfont-dl'

function preloadFonts() {
  return {
    name: 'vite-preload-fonts',
    enforce: 'post',
    generateBundle(_, bundle) {
      const preloadTags = []

      Object.values(bundle).forEach((file) => {
        if (file.type !== 'asset' || !/\.css$/.test(file.fileName)) {
          return
        }

        const css = typeof file.source === 'string' ? file.source : file.source.toString()
        const matches = css.matchAll(/url\((['"]?)([^)'\"]+)\1\)/gi)

        for (const match of matches) {
          const href = match[2].trim()
          if (!/\.(woff2?|ttf|otf|eot|svg)(\?.*)?$/i.test(href)) {
            continue
          }

          const ext = href.split('?')[0].split('.').pop()?.toLowerCase()
          const type = ext === 'woff2'
            ? 'font/woff2'
            : ext === 'woff'
              ? 'font/woff'
              : ext === 'ttf'
                ? 'font/ttf'
                : ext === 'otf'
                  ? 'font/otf'
                  : ext === 'eot'
                    ? 'application/vnd.ms-fontobject'
                    : 'font/woff2'

          preloadTags.push(`<link rel="preload" as="font" href="${href.startsWith('/') ? href : `/${href}`}" type="${type}" crossorigin />`)
        }
      })

      const uniqueTags = [...new Set(preloadTags)]
      const htmlAsset = bundle['index.html']

      if (!htmlAsset || !uniqueTags.length) {
        return
      }

      const html = typeof htmlAsset.source === 'string' ? htmlAsset.source : htmlAsset.source.toString()
      if (!html.includes('rel="preload" as="font"')) {
        htmlAsset.source = html.replace('</head>', `${uniqueTags.join('\n')}\n</head>`)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=MuseoModerno:wght@200;500;700&display=swap',
      'https://fonts.googleapis.com/css2?family=MuseoModerno:wght@200;500;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
    ], {
      // Only include the latin subset to avoid downloading every language-specific font
      subsetsAllowed: ['latin'],
      // Keep the downloaded CSS as an emitted asset (not injected inline)
      injectAsStyleTag: false,
      // Minify the generated CSS
      minifyCss: true,
    }),
    preloadFonts(),
  ],
  build: {
    sourcemap: true,
    // Do not modulepreload icon chunks on first paint; they only power
    // below-the-fold sections that are already code-split with React.lazy.
    modulePreload: {
      resolveDependencies(filename, deps) {
        return deps.filter((dep) => !dep.includes('icons-'));
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@fortawesome')) return 'icons';
            if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor';
          }
        },
      },
    },
  },
})
