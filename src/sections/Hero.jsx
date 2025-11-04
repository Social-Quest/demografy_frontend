import GradientButton from '../components/GradientButton.jsx'
import dashboardImg from '../assets/dashboard.jpg'
import dashboardBG from '../assets/dashboardBG.png'
import PartnersSlider from './PartnersSlider.jsx'
import { FadeInUp, FadeIn } from '../utils/animations.jsx'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dashboardBG})` }}
      />
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-4 pt-8 pb-12 md:px-6 lg:grid-cols-2 lg:gap-16 lg:pt-14">
        {/* Left - text */}
        <FadeInUp>
          <div>
            <FadeIn delay={0.1}>
              <span className="inline-flex  font-mono items-center gap-2 rounded-sm bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-primary ring-1 ring-slate-200 tracking-widest ">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />COMING IN BETA
              </span>
            </FadeIn>
            <FadeInUp delay={0.2}>
              <h1 className="mt-5 text-4xl font-semibold tracking-wide leading-none text-slate-900 md:text-6xl">
                <span className="text-primary">Australian property insights,</span><br className="hidden md:block" /> insights,
                <br /> propelled by data.
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <p className="mt-6 max-w-xl text-base text-[#374151] font-medium md:text-lg">
                Ditch the guesswork. Our platform gives investors, homebuyers, and pros the hard numbers on suburb growth,
                so you can make your move with confidence, not just a hunch.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="#features" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50">Discover more</Link>
                <GradientButton className="justify-center">Get early access</GradientButton>
              </div>
            </FadeInUp>
          </div>
        </FadeInUp>

        {/* Right - static image preview (place dashboard.jpg in /public) */}
        <FadeIn delay={0.3}>
          <div className="relative lg:w-[900px] xl:w-[1100px]">
            <div className="overflow-hidden rounded-2xl border border-slate-200/70 shadow-[0_20px_60px_rgba(21,12,81,0.12)]">
              <img src={dashboardImg} alt="Dashboard preview" className="block h-auto w-full md:w-full lg:h-[600px] xl:h-[700px] object-cover object-left" />
            </div>
          </div>
        </FadeIn>
      </div>

      <PartnersSlider className="py-10 md:py-14" headingClassName="text-slate-900/80" />
    </section>
  )
}

export default Hero
