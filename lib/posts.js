import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentFolder = path.join(process.cwd(), 'contents/recipes')

export function getSortedPosts() {
    
    const fileNames = fs.readdirSync(contentFolder)

    const postsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/,'')
        const fullPath = path.join(contentFolder, fileName)
        const contents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(contents)

        const tokens = matterResult.content.split('\n');
        const excerpt = tokens[0].length === 0 ? tokens[1] : tokens[0]

        return {
            id,
            excerpt,
            ...matterResult.data
        }

    })

    return postsData.sort(({date: a}, {date: b}) => {
        if(a < b) return 1
        if(a > b) return -1
        return 0
    })

}

export function getAllPosts() {

    const fileNames = fs.readdirSync(contentFolder)

    const postsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/,'')
        const fullPath = path.join(contentFolder, fileName)
        const contents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(contents)

        const tokens = matterResult.content.split('\n');
        const excerpt = tokens[0].length === 0 ? tokens[1] : tokens[0]

        return {
            id,
            excerpt,
            ...matterResult.data
        }

    })

    const sortedPosts = postsData.sort(({date: a}, {date: b}) => {
        if(a < b) return 1
        if(a > b) return -1
        return 0
    })

    return {
        dateModified: (new Date()).toISOString(),
        items: sortedPosts,
    }

}

export function getAllPostsIds() {

    const fileNames = fs.readdirSync(contentFolder)

    return fileNames.map(filename => {
        return {
            params: {
                id: filename.replace(/\.md$/, '')
            }
        }
    })

}

export async function getPostById(id) {

    const fullPath = path.join(contentFolder, `${id}.md`)
    const contents = fs.readFileSync(fullPath, 'utf8')

    const result = matter(contents)

    const procContent = await remark().use(html).process(result.content)
    const htmlContent = procContent.toString()

    return {
        id,
        content: htmlContent,
        ...result.data
    }

}