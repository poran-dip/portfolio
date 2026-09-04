import type { LucideIcon } from "lucide-react";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { contactEmailEncoded, contactPhoneEncoded } from "@/data/contact";
import { socialLinks } from "@/data/social-links";
import SocialLink from "./SocialLink";

interface RevealContactProps {
  icon: LucideIcon;
  label: string;
  encoded: string;
  hrefPrefix: string;
  formatHref?: (value: string) => string;
}

const RevealContact = ({
  icon: Icon,
  label,
  encoded,
  hrefPrefix,
  formatHref,
}: RevealContactProps) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="glass flex items-center gap-3 rounded-xl p-3 sm:p-4">
      <span className="glass-panel flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg text-bioglow">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-xs sm:text-sm text-mist">{label}</span>
        {value ? (
          <a
            href={`${hrefPrefix}${formatHref ? formatHref(value) : value}`}
            className="text-sm sm:text-base font-medium text-foam hover:text-bioglow transition-colors duration-200 truncate"
          >
            {value}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setValue(atob(encoded))}
            className="text-left text-sm sm:text-base font-medium text-mist hover:text-bioglow transition-colors duration-200 cursor-pointer"
          >
            Click to reveal
          </button>
        )}
      </div>
    </div>
  );
};

const ContactMe = () => {
  const primaryLinks = socialLinks.filter((link) => link.primary);
  const otherLinks = socialLinks.filter((link) => !link.primary);

  return (
    <section
      id="contact"
      className="w-full scroll-mt-12 md:scroll-mt-14 mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16"
    >
      <h3 className="font-bold whitespace-nowrap text-2xl">
        <span className="text-jelly">&gt; </span>
        <span className="text-bioglow">./</span>
        <span className="text-foam">contact</span>
      </h3>

      <div className="mt-6 flex flex-col gap-10">
        <p className="text-foam opacity-90">
          Open to full-time roles, freelance work, and collaborations. Reach out
          through any of the channels below — I'll get back to you soon.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <RevealContact
            icon={Mail}
            label="Email"
            encoded={contactEmailEncoded}
            hrefPrefix="mailto:"
          />
          <RevealContact
            icon={Phone}
            label="Phone"
            encoded={contactPhoneEncoded}
            hrefPrefix="tel:"
            formatHref={(value) => value.replace(/\s+/g, "")}
          />
          {primaryLinks.map((link) => (
            <SocialLink key={link.platform} {...link} />
          ))}
        </div>

        <div>
          <p className="text-sm text-mist mb-3">
            Or check out my other official accounts
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {otherLinks.map((link) => (
              <SocialLink key={link.platform} {...link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
