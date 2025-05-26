// components/dashboard/SubjectCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SubjectCardProps {
  id: string;
  title: string;
  description?: string | null;
  progress?: string | number; // e.g., "75%" or "10/15 topics"
}

const SubjectCard: React.FC<SubjectCardProps> = ({ id, title, description, progress }) => {
  return (
    <Link href={`/dashboard/subject/${id}`} passHref>
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-grow">
          {progress !== undefined && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Progress:</p>
              <p className="text-lg font-semibold">{typeof progress === 'number' ? `${progress}%` : progress}</p>
              {/* You could add a visual progress bar here if desired */}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubjectCard;