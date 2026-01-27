"use client";

export default function FeedbackButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 text-sm text-gray-600">
        💬 Want to share your feedback? DM{" "}
        <span className="font-semibold text-intuit-blue">@ainatte inbal</span>{" "}
        on Slack!
      </div>
    </div>
  );
}
