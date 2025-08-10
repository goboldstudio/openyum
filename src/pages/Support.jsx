import React from 'react'

export default function Support(){
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold">Support OpenYum</h1>
      <p className="mt-2 text-neutral-700">Help keep OpenYum free, ad-free, and community-driven.</p>
      <a
        className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl"
        href="https://checkout.square.site/merchant/MLGBRWEHCXBH1/checkout/7RSZT6HZKO35VMIAMXBPIF5D"
        target="_blank"
        rel="noreferrer"
      >
        Donate Now
      </a>
      <p className="mt-3 text-xs text-neutral-500">Note: OpenYum is not a nonprofit—donations are voluntary and non-tax-deductible.</p>
    </div>
  )
}
