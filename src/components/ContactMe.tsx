import { useForm, ValidationError } from "@formspree/react"
import { useState } from "react"

const categories = {
  tech: [
    { value: "web", label: "Web solution" },
    { value: "game", label: "Game development" }
  ],
  music: [
    { value: "production", label: "Music production" },
    { value: "mixing", label: "Mixing and mastering" }
  ]
}

const ContactMe = () => {
  const [state, handleSubmit] = useForm("xpwlpbwa")

  type CategoryKey = keyof typeof categories
  const [category, setCategory] = useState<CategoryKey>("tech")
  const subCategories = categories[category]
  
  return (
    <section id="contact" className="w-full p-6 rounded-2xl shadow-xl bg-zinc-100 
                                    text-gray-800 dark:bg-zinc-900 dark:text-white 
                                    transition-all duration-300 hover:shadow-2xl 
                                    dark:shadow-white/20 dark:hover:shadow-white/30">
      <h1 className="text-3xl font-bold mb-4">CONTACT ME</h1>

      {!state.succeeded ? (
        <div className="space-y-4">
          <p className="opacity-80">
            Need a tech solution? Want to collaborate on a song? Need your song mixed or mastered? 
            Need a game developed? Get in touch today!
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4 space-x-4 grid grid-cols-1 md:grid-cols-2"
          >
            <input type="text" name="_gotcha" className="hidden" />
            <div>
              <label className="block mb-1 text-sm font-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 rounded border dark:border-zinc-700 dark:bg-zinc-800"
                required
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 rounded border dark:border-zinc-700 dark:bg-zinc-800"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">Category</label>
              <select 
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryKey)}
                className="w-full p-2 rounded border dark:border-zinc-700 dark:bg-zinc-800"
              >
                <option value="tech">Tech</option>
                <option value="music">Music</option>
              </select>
              <ValidationError prefix="Category" field="category" errors={state.errors} />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">Sub Category</label>
              <select name="subcategory" className="w-full p-2 rounded border dark:border-zinc-700 dark:bg-zinc-800">
                {subCategories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ValidationError prefix="Sub Category" field="subcategory" errors={state.errors} />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 text-sm font-semibold">Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-2 rounded border dark:border-zinc-700 dark:bg-zinc-800"
                required
              />
              <ValidationError prefix="Title" field="title" errors={state.errors} />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 text-sm font-semibold">Message</label>
              <textarea
                name="message"
                className="w-full p-2 rounded border dark:border-zinc-700 dark:bg-zinc-800"
                rows={4}
                required
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <label className="h-full flex items-center justify-center px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition cursor-pointer">
              Add attachment
              <input type="file" name="attachment" className="hidden" />
            </label>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p className="opacity-80">
          Thanks for submitting! I typically respond within 48 hours. Looking forward to working
          together!
        </p>
      )}

      <p className="text-sm mt-4 opacity-60 italic">Sign up for my newsletter (coming soon)!</p>
    </section>
  )
}

export default ContactMe
