import {
  Map,
  Columns3,
  Activity,
  Navigation2,
  TrendingUp,
  HeartPulse,
} from 'lucide-react'
import { FadeInUp } from '../utils/animations.jsx'

const integrationFeatures = [
  {
    title: 'Suburb Profiles',
    description: 'Deep dive on growth rates, prices, demographics, and local stats.',
    icon: Map,
    iconBg: 'bg-[#DBEAFE]',
  },
  {
    title: 'Compare Mode',
    description: 'Line up suburbs side-by-side and spot future growth zones instantly.',
    icon: Columns3,
    iconBg: 'bg-[#DBEAFE]',
  },
  {
    title: 'Growth Heatmaps',
    description: 'Visual analytics backed by ABS and property listing trends.',
    icon: Activity,
    iconBg: 'bg-[#DBEAFE]',
  },
  {
    title: 'Proximity Index',
    description: 'Schools, jobs, and transport—all scored for convenience and lifestyle.',
    icon: Navigation2,
    iconBg: 'bg-[#EDE9FE]',
  },
  {
    title: 'Investment Insights',
    description: 'Yield, vacancy rates, and capital growth trajectories simplified.',
    icon: TrendingUp,
    iconBg: 'bg-[#EDE9FE]',
  },
  {
    title: 'Livability Scores',
    description: 'See what everyday life feels like across suburbs before you commit.',
    icon: HeartPulse,
    iconBg: 'bg-[#EDE9FE]',
  },
]

function Integrations() {
  return (
    <section className="bg-[#f9fafb] py-20 md:py-24" id="features">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="text-center">
          <FadeInUp delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-sm bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" /> Features
            </span>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-5xl">
              Everything you need to make an informed <span className="text-[#9CA3AF]">property decision.</span>
            </h2>
          </FadeInUp>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3" >
          {integrationFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <FadeInUp key={feature.title} delay={0.3 + index * 0.1}>
                <article
                  className="flex h-full flex-col gap-4 rounded-[28px] border border-white/70 bg-white/70 p-8 shadow-md "
                >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}
                >
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mt-10">{feature.title}</h3>
                  <p className="mt-2 text-sm text-[#374151] font-medium md:text-base">{feature.description}</p>
                </div>
              </article>
              </FadeInUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Integrations
