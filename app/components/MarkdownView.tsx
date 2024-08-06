'use client';

import MarkdownPreview from '@uiw/react-markdown-preview';

export default function MarkdownView({content}: {content: string}) {
  return <MarkdownPreview source={content} />
}