import { createFileRoute } from '@tanstack/react-router'
import { getStore } from '@netlify/blobs'
import { PHOTO_STORE } from '../../lib/ambassadors.js'

/** GET /api/ambassador-photos/:key — public read of an uploaded ambassador photo. */
export const Route = createFileRoute('/api/ambassador-photos/$key')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const store = getStore(PHOTO_STORE)
          const blob = await store.getWithMetadata(params.key, { type: 'arrayBuffer' })
          if (!blob) return new Response('Not found', { status: 404 })

          const contentType = typeof blob.metadata?.contentType === 'string' ? blob.metadata.contentType : 'application/octet-stream'
          return new Response(blob.data as ArrayBuffer, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          })
        } catch (err) {
          console.error('Ambassador photo read error:', err)
          return new Response('Not found', { status: 404 })
        }
      },
    },
  },
})
