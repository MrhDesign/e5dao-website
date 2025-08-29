import { Metadata } from 'next';
import DetailPage, { generateDetailMetadata } from '../../../components/DetailPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 生成Metadata的函数
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateDetailMetadata(slug, 'news');
}

export default async function NewsDetail({ params }: PageProps) {
  const { slug } = await params;
  return <DetailPage slug={slug} type="news" />;
}