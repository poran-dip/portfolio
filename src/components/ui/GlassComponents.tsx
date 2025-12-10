import { useState } from 'react';
import ThemeToggleButton from '../ThemeToggle';
import { GlassLayout } from '../GlassLayout';
import { GlassNavbar } from '../GlassNavbar';
import { GlassHeading } from './GlassHeading';
import { GlassLink } from './GlassLink';
import { GlassCard } from './GlassCard';
import { GlassParagraph } from './GlassParagraph';
import { GlassButton } from './GlassButton';
import { GlassAvatar } from './GlassAvatar';
import { GlassInput } from './GlassInput';
import { GlassSelect } from './GlassSelect';
import { glassAnimations } from '../../styles/glass';
import { GlassFooter } from '../GlassFooter';
import { GlassToast } from './GlassToast';

// Demo Component to showcase all components
const GlassComponentsDemo: React.FC = () => {
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectValue(e.target.value);
  };

  const showToast = (): void => {
    setToastVisible(true);
  };

  const hideToast = (): void => {
    setToastVisible(false);
  };

  return (
    <GlassLayout>
      <GlassNavbar>
        <div className="flex items-center justify-between">
          <GlassHeading level={3} className="bg-linear-to-r!rom-gray-800 to-gray-600 dark:from-white dark:to-gray-200">
            Glass UI
          </GlassHeading>
          <div className="flex items-center space-x-4">            
            <GlassLink href="#demo" variant="internal">Demo</GlassLink>
            <GlassLink href="https://example.com">External</GlassLink>
            <ThemeToggleButton />
          </div>
        </div>
      </GlassNavbar>

      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          <GlassCard>
            <GlassHeading level={1}>Welcome to Glass UI</GlassHeading>
            <GlassParagraph className="mt-4">
              A beautiful collection of glassmorphism components built with React and Tailwind CSS. 
              These components feature elegant transparency effects, smooth animations, and both light and dark theme support.
            </GlassParagraph>
          </GlassCard>

          <div className="grid md:grid-cols-5 gap-6">
            <GlassCard className="col-span-3">
              <GlassHeading level={3}>Buttons & Actions</GlassHeading>
              <div className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-3">
                  <GlassButton variant="primary">Primary</GlassButton>
                  <GlassButton variant="secondary">Secondary</GlassButton>
                  <GlassButton variant="success">Success</GlassButton>
                  <GlassButton variant="danger">Danger</GlassButton>
                </div>
                <GlassButton disabled className="w-full">Disabled Button</GlassButton>
              </div>
            </GlassCard>

            <GlassCard className="col-span-2">
              <GlassHeading level={3}>Profile</GlassHeading>
              <div className="flex items-center space-x-4 mt-4">
                <GlassAvatar
                  src="profile.png"
                  alt="Profile"
                  size="lg"
                />
                <div>
                  <GlassHeading level={4}>John Doe</GlassHeading>
                  <GlassParagraph>Glass UI Designer</GlassParagraph>
                </div>
              </div>
            </GlassCard>
          </div>

          <GlassCard>
            <GlassHeading level={3}>Forms</GlassHeading>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <GlassInput
                  type="text"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <GlassSelect value={selectValue} onChange={handleSelectChange}>
                  <option value="">Select a category</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                </GlassSelect>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <GlassHeading level={3}>Toast Notifications</GlassHeading>
            <div className="flex flex-wrap gap-3 mt-4">
              <GlassButton 
                variant="primary" 
                onClick={showToast}
              >
                Show Toast
              </GlassButton>
            </div>
          </GlassCard>

          <GlassCard>
            <GlassHeading level={3}>Typography & Links</GlassHeading>
            <div className="space-y-4 mt-4">
              <GlassHeading level={2}>This is a Heading 2</GlassHeading>
              <GlassParagraph>
                This is a paragraph with some sample text. You can also include{' '}
                <GlassLink href="https://example.com">external links</GlassLink> and{' '}
                <GlassLink href="#demo" variant="internal">internal links</GlassLink> within your content.
              </GlassParagraph>
            </div>
          </GlassCard>

          {/* Custom Animation Examples */}
          <GlassCard>
            <GlassHeading level={3}>Custom Animation Examples</GlassHeading>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className={`p-4 rounded-lg bg-blue-500/20 text-center ${glassAnimations.hover}`}>
                  Hover
                </div>
                <div className={`p-4 rounded-lg bg-green-500/20 text-center ${glassAnimations.hoverLg}`}>
                  Hover Lg
                </div>
                <div className={`p-4 rounded-lg bg-purple-500/20 text-center ${glassAnimations.hoverXl}`}>
                  Hover XL
                </div>
                <div className={`p-4 rounded-lg bg-pink-500/20 text-center ${glassAnimations.hoverSubtle}`}>
                  Subtle
                </div>
              </div>
              <GlassParagraph>
                Use the exported <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">glassAnimations</code> object 
                to apply hover effects anywhere: <code>glassAnimations.hover</code>, <code>glassAnimations.hoverLg</code>, etc.
              </GlassParagraph>
            </div>
          </GlassCard>
        </div>
      </div>

      <GlassFooter>
        <div className="text-center">
          <GlassHeading level={4}>Glass UI Components</GlassHeading>
          <GlassParagraph className="mt-2">
            Built with React, Tailwind CSS, TypeScript, and lots of ✨
          </GlassParagraph>
        </div>
      </GlassFooter>

      <GlassToast
        message="Toast notification shown!"
        variant="info"
        isVisible={toastVisible}
        onClose={hideToast}
      />
    </GlassLayout>
  );
};

export default GlassComponentsDemo;