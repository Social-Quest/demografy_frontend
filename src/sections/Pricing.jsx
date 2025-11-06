import { useState } from 'react'
import pricingBG from '../assets/pricingBG.png'
import GradientButton from '../components/GradientButton.jsx'
import checkIcon from '../assets/arrowLeftPurple.svg'
import trueIcon from '../assets/true.svg'
import priceHero from '../assets/dashboard.png'
import { useNavigate } from 'react-router-dom'
import { submitEarlyAccessEmail } from '../services/authApi.js'

const plans = [
    {
        name: 'The Scout',
        price: 'A$ 0',
        cadence: '/mo',
        description: 'Start for free',
        features: [
            'Suburb Profile Snapshot',
            'Basic Growth Trends',
            'Lifestyle Score & Commute Time',
            'Save & Compare up to 3 Suburbs',
            'Basic Level Filters',
        ],
    },
    {
        name: 'The Investor',
        price: 'A$ 19.90',
        cadence: '/mo',
        description: 'Coming Soon',
        features: [
            'Everything in Scout, plus:',
            'Unlimited Suburb Comparisons',
            'Advanced Analytics',
            'Deep-Dive Demographics',
            'Custom Alerts',
            'Data Export to CSV',
        ],
        popular: true,
    },
    {
        name: 'The Agency',
        price: 'A$ 49.90',
        cadence: '/mo',
        features: [
            'Everything in Investor, plus',
            'White-Labelled Reports',
            'Custom Metric Tracking',
            'Dedicated Account Manager',
            '24/7 Priority Support',
            'Unlimited Saves',
        ],
    },
]

const perks = [
    { label: 'Free trial' },
    { label: 'Cancel anytime' },
    { label: 'Support included' },
]

function Pricing() {
    const navigate = useNavigate()
    const handleSignup = () => {
        navigate('/signup')
    }
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        setStatus('loading')
        setErrorMessage('')

        try {
            await submitEarlyAccessEmail(email)
            setStatus('success')
            setEmail('')
        } catch (error) {
            setStatus('error')
            setErrorMessage(error.message || 'Unable to submit right now. Please try again later.')
        }
    }
    return (
        <section id="pricing" className="relative overflow-hidden bg-[#f3f4f6] py-20 md:py-24">
            <div className="pointer-events-none absolute left-0 top-1/2 z-0 h-[140%] w-full -translate-y-1/2">
                <img src={pricingBG} alt="Pricing background" className="h-full w-full object-cover object-right" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 md:px-6">
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 rounded-sm bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" /> Pricing
                    </span>
                    <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-5xl">
                        Start making <span className="text-primary">smarter</span> decisions,
                        <span className="mt-2 block text-[#9CA3AF]">Choose a plan</span>
                    </h2>
                </div>

                <div className="mt-14 grid gap-8 lg:grid-cols-3">
                    {plans.map((plan, index) => {
                        if (plan.popular) {
                            return (
                                <div key={plan.name} className="animated-border lg:scale-105">
                                    <article className="animated-border-content flex h-full flex-col p-8 shadow-md transition md:pt-10">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-lg font-semibold text-slate-900">{plan.name}</p>
                                                <span className="rounded-sm bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] inline-block mr-2" />
                                                    Coming Soon
                                                </span>
                                            </div>
                                            <div className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                                                {plan.price}
                                                <span className="text-4xl font-medium text-[#9CA3AF]">{plan.cadence}</span>
                                            </div>
                                        </div>

                                        <ul className="mt-8 space-y-3 text-sm text-[#374151] md:text-base">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-3">
                                                    <img src={checkIcon} alt="Check icon" className="w-6 h-6" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto pt-10">
                                            <GradientButton variant="primary" className="w-full" onClick={handleSignup}>
                                                Sign-up
                                            </GradientButton>
                                        </div>
                                    </article>
                                </div>
                            )
                        } else {
                            return (
                                <article
                                    key={plan.name}
                                    className="flex h-full flex-col rounded-[32px] border border-[#e5e7eb] bg-[#f9fafb] p-8 shadow-md transition md:pt-10 lg:scale-95 border border-[#e3daf7]"
                                >
                                    <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                                <p className="text-lg font-semibold text-slate-900">{plan.name}</p>
                                                {index !== 0 && (
                                                    <span className="rounded-sm bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] inline-block mr-2" />
                                                        Coming Soon
                                                    </span>
                                                )}
                                            </div>
                                        <div className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                                            {plan.price}
                                            <span className="text-4xl font-medium text-[#9CA3AF]">{plan.cadence}</span>
                                        </div>
                                    </div>

                                    <ul className="mt-8 space-y-3 text-sm text-[#374151] md:text-base">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <img src={checkIcon} alt="Check icon" className="w-6 h-6" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto pt-10">
                                        <GradientButton variant="secondary" className="w-full" onClick={handleSignup}>
                                            Sign-up
                                        </GradientButton>
                                    </div>
                                </article>
                            )
                        }
                    })}
                </div>

                <div className="relative mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-[#7C3AED]">
                    {perks.map((perk) => (
                        <div key={perk.label} className="inline-flex items-center gap-2">
                            <img src={trueIcon} alt="Check icon" className="w-6 h-6" />
                            <span>{perk.label}</span>
                        </div>
                    ))}
                </div>

                <div id="pricing-cta" className="relative overflow-hidden rounded-[36px] backdrop-blur-xl bg-white/70 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] mt-10 p-8 md:p-14 scroll-mt-[140px] md:scroll-mt-[160px] lg:scroll-mt-[200px]">
                    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" /> Ready?
                        </span>
                        <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
                            Real estate analytics just
                            <span className="block text-primary">a sign-up away.</span>
                        </h2>
                        <p className="max-w-xl text-sm text-[#495058] md:text-base">
                            Stop wading through conflicting opinions and start making confident, data-backed decisions. The best time to get ahead was yesterday. The next best time is now.
                        </p>
                        <form
                            className="flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-center"
                            onSubmit={handleFormSubmit}
                        >
                            <input
                                type="email"
                                name="email"
                                placeholder="yourmail@gmail.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="h-12 w-full rounded-xl border border-white/70 bg-[#E5E7EB] px-4 text-sm text-[#374151] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/40"
                                aria-label="Email address"
                                disabled={status === 'loading'}
                                required
                            />
                            <GradientButton
                                type="submit"
                                className="w-full h-12 py-4 sm:w-auto"
                                showIcon={false}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Submitting…' : 'Sign-up'}
                            </GradientButton>
                        </form>
                        {status === 'success' ? (
                            <p className="text-sm font-medium text-emerald-600">
                                Thanks! You're on the list. We'll reach out soon.
                            </p>
                        ) : null}
                        {status === 'error' && errorMessage ? (
                            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
                        ) : null}
                    </div>

                    <div className="mt-12 overflow-hidden rounded-[24px] backdrop-blur-lg bg-white/40 border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]">
                        <img src={priceHero} alt="Analytics dashboard preview" className="w-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pricing
