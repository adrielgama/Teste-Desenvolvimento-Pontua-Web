import { Skeleton } from '../ui/skeleton'

export const CharacterSkeleton = () => {
  return (
    <div className="flex max-h-[150px] flex-row gap-4 rounded-2xl bg-gray-100 p-4 font-navigation">
      <Skeleton className="h-28 w-20 rounded-xl" />
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="mb-4 h-4 w-[250px]" />
          <Skeleton className="h-2 w-[240px]" />
          <Skeleton className="h-2 w-[240px]" />
          <Skeleton className="h-2 w-[240px]" />
          <Skeleton className="h-2 w-[240px]" />
          <Skeleton className="h-2 w-[240px]" />
        </div>
      </div>
    </div>
  )
}
