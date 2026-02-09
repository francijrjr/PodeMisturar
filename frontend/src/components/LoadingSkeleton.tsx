import React from "react";

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border-3 border-gray-300 p-5 shadow-lg bg-white animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-300 rounded w-24"></div>
        <div className="h-4 bg-gray-300 rounded w-28"></div>
      </div>
    </div>
  );
}

export function ResultSkeleton() {
  return (
    <div className="rounded-3xl border-3 border-indigo-200 p-8 shadow-2xl bg-white animate-pulse">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-indigo-200">
        <div className="w-14 h-14 bg-indigo-200 rounded-xl"></div>
        <div className="flex-1">
          <div className="h-8 bg-indigo-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-indigo-200 rounded w-1/3"></div>
        </div>
      </div>
      <div className="space-y-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-indigo-50 p-4 rounded-xl border border-indigo-100"
          >
            <div className="h-4 bg-indigo-200 rounded w-24 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-indigo-200 rounded w-full"></div>
              <div className="h-4 bg-indigo-200 rounded w-4/5"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-indigo-200 to-purple-200 p-6 rounded-3xl shadow-xl animate-pulse border-2 border-indigo-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-indigo-300 rounded"></div>
              <div className="w-10 h-10 bg-indigo-300 rounded-lg"></div>
            </div>
            <div className="h-4 bg-indigo-300 rounded w-32 mb-2"></div>
            <div className="h-12 bg-indigo-300 rounded w-24"></div>
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-indigo-100 animate-pulse">
        <div className="h-8 bg-indigo-200 rounded w-64 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-indigo-200 rounded w-24"></div>
                <div className="h-4 bg-indigo-200 rounded w-32"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-300 rounded-full w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
