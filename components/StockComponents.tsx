import { cn } from "@/lib/utils"

interface PriceChangeProps {
  change: number
  changePercent: number
  className?: string
}

export function PriceChange({ change, changePercent, className }: PriceChangeProps) {
  const isPositive = change >= 0
  const color = isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
  const bgColor = isPositive ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"

  return (
    <div className={cn(`flex items-center gap-2 ${bgColor} px-3 py-1 rounded-full w-fit`, className)}>
      <span className={cn("font-semibold text-sm", color)}>
        {isPositive ? "+" : ""}{change.toFixed(2)}
      </span>
      <span className={cn("text-xs font-medium", color)}>
        ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)
      </span>
    </div>
  )
}

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  onClick?: () => void
}

export function StockCard({ symbol, name, price, change, changePercent, onClick }: StockCardProps) {
  return (
    <div onClick={onClick} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">{symbol}</h3>
          <p className="text-sm text-gray-500">{name}</p>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-xl font-bold">${price.toFixed(2)}</div>
        <PriceChange change={change} changePercent={changePercent} />
      </div>
    </div>
  )
}
