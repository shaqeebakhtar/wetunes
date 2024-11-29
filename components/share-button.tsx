'use client';
import { Button } from '@/components/ui/button';
import { absoluteUrl } from '@/utils/absoulute-url';
import { Check, Copy, Share2 } from 'lucide-react';
import React, { useState } from 'react';

type CopyLinkButtonProps = {
  value: string;
};

const ShareButton = ({ value }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setCopied(true);
        navigator.clipboard.writeText(absoluteUrl(value));
        setTimeout(() => setCopied(false), 3000);
      }}
      variant={'secondary'}
      size={'icon'}
      className="group/copy rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <>
          <Share2 className="w-4 h-4 group-hover/copy:hidden" />
          <Copy className="w-4 h-4 hidden group-hover/copy:block" />
        </>
      )}
      <span className="sr-only">Copy share link</span>
    </Button>
  );
};

export default ShareButton;
