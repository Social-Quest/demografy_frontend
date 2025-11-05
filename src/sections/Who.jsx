import who1 from '../assets/who1.svg'
import who2 from '../assets/who2.svg'
import who3 from '../assets/who3.svg'
import who4 from '../assets/who4.svg'
import who5 from '../assets/who5.svg'
import who6 from '../assets/who6.svg'
import who7 from '../assets/who7.svg'
import who8 from '../assets/who8.svg'
import who9 from '../assets/who9.svg'

const audiences = [
  {
    icon: who1,
    title: 'First-Home Buyers',
    subtitle: 'Decide best suburb',
  },
  {
    icon: who2,
    title: 'Investors',
    subtitle: 'Growth versus risk',
  },
  {
    icon: who3,
    title: 'Real Estate Agents',
    subtitle: 'Business building',
  },
  {
    icon: who4,
    title: 'Property Developers',
    subtitle: 'Best regions to focus',
  },
  {
    icon: who5,
    title: 'Mortgage Brokers',
    subtitle: 'Add-on services',
  },
  {
    icon: who6,
    title: 'Families Relocating',
    subtitle: 'Choose the best area',
  },
  {
    icon: who7,
    title: "Buyer’s Agent",
    subtitle: 'Analytics within reach',
  },
  {
    icon: who8,
    title: 'Home Upgraders',
    subtitle: 'Decide when to sell',
  },
  {
    icon: who9,
    title: 'Data Geeks',
    subtitle: 'Play around with data',
  },
]

function Who() {
  return (
    <main className="bg-white py-20 md:py-24 " id="use-case">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 md:px-6 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="space-y-6 text-left">
          <span className="inline-flex items-center gap-2 rounded-sm bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" /> Who’s it for?
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Built for everyone in the <span className="text-primary">property game.</span>
          </h1>
          <p className="text-base text-[#374151] md:text-lg">
            Whether you’re buying your first studio, flipping your tenth investment property, or helping clients navigate the
            market—our platform speaks your language.
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {audiences.map((audience) => (
            <article
              key={audience.title}
              className="flex h-full flex-col gap-3 rounded-[26px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-5"
            >
              <div className="inline-flex h-11 w-11 items-center justify-start rounded-xl">
                <img src={audience.icon} alt={audience.title} className="h-full w-full" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-black">{audience.title}</h2>
                <p className="mt-1 text-sm text-[#4b5563] font-medium" >{audience.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Who
