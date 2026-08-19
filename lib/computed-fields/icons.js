import fs from 'fs'
import { join } from 'path'

const resolve = async (icon, { mdxOptions }) => {
  if (!icon?.src || !/^\//.test(icon.src)) return null

  // Only SVGs get inlined (for CSS-driven tinting via `fill: currentColor`).
  // Other local image formats (png/jpg/webp) are returned as-is and rendered via <img>.
  if (!/\.svg$/i.test(icon.src)) return icon

  const filePath = join(process.cwd(), mdxOptions.publicDir, icon.src)
  if (!fs.existsSync(filePath)) return null

  try {
    icon.source = await fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    console.error(err)
  }

  return icon
}

// Single entry
export const icon = {
  hasSubFields: false,
  resolve,
}

// Multiple entries
export const icons = {
  hasSubFields: false,
  resolve: async (icons, { mdxOptions }) =>
    await Promise.all(icons.map(async (icon) => await resolve(icon, { mdxOptions }))),
}
