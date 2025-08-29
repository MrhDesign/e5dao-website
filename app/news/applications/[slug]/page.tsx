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
  return generateDetailMetadata(slug, 'application');
}

export default async function ApplicationDetail({ params }: PageProps) {
  const { slug } = await params;
  return <DetailPage slug={slug} type="application" />;
}