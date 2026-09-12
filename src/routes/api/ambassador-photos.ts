import { createFileRoute } from '@tanstack/react-router'
import { getStore } from '@netlify/blobs'
import { getAdminUser } from '../../lib/authorization.js'
import { PHOTO_STORE } from '../../lib/ambassadors.js'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

const extensionFor = (type: string) =>
  ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' })[type] ?? 'img'

/**
 * POST /api/ambassador-photos — admin-only upload of an ambassador profile picture.
 * Accepts a multipart form with a `file` field and returns the URL to store on the record.
 */
export const Route = createFileRoute('/api/ambassador-photos')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }

        try {
          const form = await request.formData()
          const file = form.get('file')
          if (!(file instanceof File)) {
            return Response.json({ error: 'No file provided' }, { status: 400 })
          }
          if (!ALLOWED_TYPES.includes(file.type)) {
            return Response.json({ error: 'Photo must be a JPEG, PNG, WebP, GIF or AVIF image' }, { status: 400 })
          }
          if (file.size > MAX_BYTES) {
            return Response.json({ error: 'Photo must be smaller than 5 MB' }, { status: 400 })
          }

          const key = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extensionFor(file.type)}`
          const store = getStore(PHOTO_STORE)
          await store.set(key, await file.arrayBuffer(), { metadata: { contentType: file.type } })

          return Response.json({ url: `/api/ambassador-photos/${key}`, key }, { status: 201 })
        } catch (err) {
          console.error('Ambassador photo upload error:', err)
          return Response.json({ error: 'Failed to upload photo' }, { status: 500 })
        }
      },
    },
  },
})
