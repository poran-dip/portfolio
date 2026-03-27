import { useForm, ValidationError } from "@formspree/react";
import {
  GlassButton,
  GlassFilePicker,
  GlassHeading,
  GlassInput,
  GlassLabel,
  GlassParagraph,
  GlassTextarea,
} from "@/components/ui";

const ContactMe = () => {
  const [state, handleSubmit, reset] = useForm("xpwlpbwa");

  return (
    <section id="contact" className="scroll-mt-8 py-4 md:py-12">
      <div className="flex items-center gap-4">
        <GlassHeading level={3} className="font-bold whitespace-nowrap">
          CONTACT ME
        </GlassHeading>
        <div className="h-px flex-1 bg-white/20" />
      </div>

      {!state.succeeded ? (
        <div className="mt-6 flex flex-col gap-6">
          <GlassParagraph>
            Need a tech solution? Want to collab on a track? Got a song that
            needs mixing or mastering? Dreaming of your own game? Just wanna say
            hi? <strong>Let's make it happen</strong>—get in touch today!
          </GlassParagraph>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="gap-3 grid grid-cols-1 md:grid-cols-2"
          >
            <GlassInput
              type="text"
              name="_gotcha"
              className="hidden"
              autoComplete="off"
            />
            <div>
              <GlassLabel htmlFor="name">Name *</GlassLabel>
              <GlassInput
                type="text"
                name="name"
                id="name"
                required
                autoComplete="name"
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />
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
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
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
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            <div className="pt-3 sm:pt-6 md:col-span-2 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:justify-center">
              <GlassFilePicker
                name="attachment"
                className="w-full sm:w-40 lg:w-48 cursor-pointer text-sm lg:text-base h-10 lg:h-12"
              >
                Add Attachment
              </GlassFilePicker>

              <GlassButton
                type="submit"
                variant="success"
                disabled={state.submitting}
                className="w-full sm:w-40 lg:w-48 cursor-pointer text-sm lg:text-base h-10 lg:h-12"
              >
                {state.submitting ? "Sending..." : "Submit"}
              </GlassButton>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          <GlassParagraph>
            Thanks for reaching out! I will get back to you within 48 hours.
            Looking forward to working together!
          </GlassParagraph>

          <div className="flex justify-center">
            <GlassButton
              onClick={() => {
                reset();
                document.getElementById("contact")?.scrollIntoView();
              }}
              className="w-full sm:w-40 lg:w-48 cursor-pointer text-sm lg:text-base h-10 lg:h-12"
            >
              Message Again
            </GlassButton>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactMe;
