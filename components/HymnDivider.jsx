import Image from 'next/image'

export default function HymnDivider() {
  return (
    <div className="hymn-divider" aria-hidden="true">
      <Image className="four-dot" src="/four-dot.png" height={15} width={15} alt="" />
    </div>
  )
}
