import BLOG from '@/blog.config'
import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react' // 引入 React 库，用来定义状态变量和函数

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const LatestPostsGroup = ({ latestPosts, siteInfo }) => {
  // 获取当前路径
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()

  if (!latestPosts) {
    return <></>
  }

  // 定义一个状态变量，用来控制是否展开所有文章
  const [expanded, setExpanded] = React.useState(false)

  // 定义一个函数，用来切换展开状态
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  // 定义一个变量，用来存储要展示的文章数量
  const sliceCount = expanded ? latestPosts.length : 6

  return <>
    <div className=" mb-2 px-1 flex flex-nowrap justify-between">
      <div>
        <i className="mr-2 fas fas fa-history" />
        {locale.COMMON.LATEST_POSTS}
      </div>
      <button onClick={toggleExpanded} className="text-sm text-gray-500 hover:text-indigo-400">
        {expanded ? '隐藏' : '展开'}
      </button>
    </div>
    {expanded && latestPosts.map(post => { // 使用 && 运算符来实现条件渲染，只有当 expanded 为 true 时才渲染文章列表
      const selected = currentPath === `${BLOG.SUB_PATH}/${post.slug}`

      const headerImage = post?.pageCoverThumbnail ? post.pageCoverThumbnail : siteInfo?.pageCover

      return (
        (<Link
          key={post.id}
          title={post.title}
          href={`${BLOG.SUB_PATH}/${post.slug}`}
          passHref
          className={'my-3 flex'}>

          <div className="w-20 h-14 overflow-hidden relative">
            <LazyImage src={`${headerImage}`} className='object-cover w-full h-full'/>
          </div>
          <div
            className={
              (selected ? ' text-indigo-400 ' : 'dark:text-gray-400 ') +
              ' text-sm overflow-x-hidden hover:text-indigo-600 px-2 duration-200 w-full rounded ' +
              ' hover:text-indigo-400 cursor-pointer items-center flex'
            }
          >
            <div>
              <div className='line-clamp-2 menu-link'>{post.title}</div>
              <div className="text-gray-500">{post.lastEditedDay}</div>
            </div>
          </div>

        </Link>)
      )
    })}
  </>
}
export default LatestPostsGroup
