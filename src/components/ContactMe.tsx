import { useForm, ValidationError } from "@formspree/react"
import { useState } from "react"
import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import { GlassInput } from "./ui/GlassInput"
import { GlassSelect } from "./ui/GlassSelect"
import { GlassTextarea } from "./ui/GlassTextarea"
import { GlassLabel } from "./ui/GlassLabel"
import { GlassParagraph } from "./ui/GlassParagraph"
import { GlassButton } from "./ui/GlassButton"
import { GlassFilePicker } from "./ui/GlassFilePicker"

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
    <GlassCard id="contact" className="scroll-mt-20">
      <GlassHeading>CONTACT ME</GlassHeading>

      {!state.succeeded ? (
        <div className="mt-6 space-y-4">
          <GlassParagraph className="!text-lg !mb-0">
            Need a tech solution? Want to collab on a track? Got a song that needs mixing or mastering? Dreaming of your own game? Just wanna say hi?
          </GlassParagraph>
          <GlassParagraph className="!text-lg !mt-0">
            <strong>Let’s make it happen</strong>—get in touch today!
          </GlassParagraph>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="gap-6 grid grid-cols-1 md:grid-cols-2"
          >
            <GlassInput type="text" name="_gotcha" className="hidden" autoComplete="off" />
            <div>
              <GlassLabel htmlFor="name">Name *</GlassLabel>
              <GlassInput
                type="text"
                name="name"
                id="name"
                required
                autoComplete="name"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>

            <div>
              <GlassLabel htmlFor="email">Email *</GlassLabel>
              <GlassInput
                type="email"
                name="email"
                id="email"
                required
                autoComplete="email"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <GlassLabel htmlFor="category">Category *</GlassLabel>
              <GlassSelect 
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryKey)}
              >
                <option value="tech">Tech</option>
                <option value="music">Music</option>
              </GlassSelect>
              <ValidationError prefix="Category" field="category" errors={state.errors} />
            </div>

            <div>
              <GlassLabel htmlFor="service">Service *</GlassLabel>
              <GlassSelect id="service" name="service">
                {subCategories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </GlassSelect>
              <ValidationError prefix="Service" field="service" errors={state.errors} />
            </div>

            <div className="md:col-span-2">
              <GlassLabel htmlFor="title">Title *</GlassLabel>
              <GlassInput
                type="text"
                name="title"
                id="title"
                required
                autoComplete="off"
              />
              <ValidationError prefix="Title" field="title" errors={state.errors} />
            </div>

            <div className="md:col-span-2">
              <GlassLabel htmlFor="message">Message *</GlassLabel>
              <GlassTextarea
                name="message"
                id="message"
                rows={4}
                required
                autoComplete="off"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <GlassFilePicker name="attachment" variant="success" className="!from-lime-400/80 !to-lime-500/80 text-white">
              Add attachment (optional)
            </GlassFilePicker>

            <GlassButton
              type="submit"
              className="px-4 py-2 cursor-pointer rounded bg-blue-500/80 text-white font-semibold hover:bg-blue-600/80 transition"
            >
              Submit
            </GlassButton>
          </form>
        </div>
      ) : (
        <div className="grid md:grid-cols-4">
          <GlassParagraph className="!text-lg mt-4 md:col-span-4">
            Thanks for submitting! I will get back to you within 48 hours. Looking forward to working together!
          </GlassParagraph>
        </div>
      )}
    </GlassCard>
  )
}

export default ContactMe
