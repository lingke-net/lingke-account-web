"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function FeedbackDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-describedby="feedback-desc">
        <DialogHeader>
          <DialogTitle className="text-center">提交反馈</DialogTitle>
          <DialogDescription id="feedback-desc" className="text-center">
            您需要前往 YouTrack 进行反馈
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
          <Button variant="outline" asChild className="flex-1">
            <a href="https://support.lingke.ink" target="_blank" rel="noopener noreferrer">
              帮助中心
            </a>
          </Button>
          <Button asChild className="flex-1">
            <a href="https://lingke.youtrack.cloud/form/a23af9bd-43bf-4735-a9b7-749c5eaee70c" target="_blank" rel="noopener noreferrer">
              前往反馈
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
