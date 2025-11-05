import coinIcon from '../assets/coin.svg'
import pdfIcon from '../assets/pdf.svg'
import { FadeInUp } from '../utils/animations.jsx'

const integrationFeatures = [
  {
    title: 'Suburb Profiles',
    description: 'Deep dive on growth rates, prices, demographics, and local stats.',
  },
  {
    title: 'Compare Mode',
    description: 'Line up suburbs side-by-side and spot future growth zones instantly.',
  },
  {
    title: 'Growth Heatmaps',
    description: 'Visual analytics backed by ABS and property listing trends.',
  },
  {
    title: 'Proximity Index',
    description: 'Schools, jobs, and transport—all scored for convenience and lifestyle.',
  },
  {
    title: 'Investment Insights',
    description: 'Yield, vacancy rates, and capital growth trajectories simplified.',
  },
  {
    title: 'Livability Scores',
    description: 'See what everyday life feels like across suburbs before you commit.',
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
          {integrationFeatures.map((feature, index) => (
            <FadeInUp key={feature.title} delay={0.3 + index * 0.1}>
              <article
                className="flex h-full flex-col gap-4 rounded-[28px] border border-white/70 bg-white/70 p-8 shadow-md "
              >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                  index < 3 ? 'bg-[#DBEAFE]' : 'bg-[#EDE9FE]'
                }`}
              >
                <img src={index < 3 ? coinIcon : pdfIcon} alt="Feature icon" className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mt-10">{feature.title}</h3>
                <p className="mt-2 text-sm text-[#374151] font-medium md:text-base">{feature.description}</p>
              </div>
            </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Integrations
