'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type AdSize = {
  name: string;
  width: number;
  height: number;
};

type AdTemplate = {
  id: string;
  name: string;
  gradient: string;
  textColor: string;
};

const AD_SIZES: AdSize[] = [
  { name: 'Instagram Post', width: 1080, height: 1080 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
  { name: 'Facebook Ad', width: 1200, height: 628 },
  { name: 'Twitter/X Post', width: 1200, height: 675 },
  { name: 'LinkedIn Post', width: 1200, height: 627 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  { name: 'Google Display', width: 970, height: 250 },
  { name: 'Billboard', width: 1920, height: 1080 },
];

const TEMPLATES: AdTemplate[] = [
  { id: '1', name: 'Sunset Glow', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#ffffff' },
  { id: '2', name: 'Ocean Breeze', gradient: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)', textColor: '#ffffff' },
  { id: '3', name: 'Forest Green', gradient: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)', textColor: '#ffffff' },
  { id: '4', name: 'Fire Burst', gradient: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 50%, #2BFF88 100%)', textColor: '#000000' },
  { id: '5', name: 'Midnight', gradient: 'linear-gradient(135deg, #000000 0%, #434343 100%)', textColor: '#ffffff' },
  { id: '6', name: 'Golden Hour', gradient: 'linear-gradient(135deg, #FFD89B 0%, #19547B 100%)', textColor: '#000000' },
  { id: '7', name: 'Cotton Candy', gradient: 'linear-gradient(135deg, #FAD0C4 0%, #FFD1FF 100%)', textColor: '#333333' },
  { id: '8', name: 'Electric Lime', gradient: 'linear-gradient(135deg, #00F260 0%, #0575E6 100%)', textColor: '#ffffff' },
  { id: '9', name: 'Royal Purple', gradient: 'linear-gradient(135deg, #360033 0%, #0b8793 100%)', textColor: '#ffffff' },
  { id: '10', name: 'Neon Lights', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', textColor: '#ffffff' },
];

export default function Home() {
  const [headline, setHeadline] = useState('Amazing Product');
  const [subheadline, setSubheadline] = useState('Limited Time Offer - 50% Off!');
  const [cta, setCta] = useState('Shop Now');
  const [selectedSize, setSelectedSize] = useState<AdSize>(AD_SIZES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<AdTemplate>(TEMPLATES[0]);
  const [fontSize, setFontSize] = useState(72);
  const [subFontSize, setSubFontSize] = useState(36);
  const [logoText, setLogoText] = useState('YOUR LOGO');
  const [showLogo, setShowLogo] = useState(true);
  const adRef = useRef<HTMLDivElement>(null);

  const downloadAd = async () => {
    if (adRef.current) {
      try {
        const dataUrl = await toPng(adRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          width: selectedSize.width,
          height: selectedSize.height,
        });

        const link = document.createElement('a');
        link.download = `ad-${selectedSize.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to generate image. Please try again.');
      }
    }
  };

  const scale = Math.min(600 / selectedSize.width, 400 / selectedSize.height);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            AI Ad Creator Pro
          </h1>
          <p className="text-xl text-gray-300">Create High-Quality Professional Ads in Seconds - 100% Free</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Controls */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Customize Your Ad</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ad Size</label>
                <select
                  value={selectedSize.name}
                  onChange={(e) => setSelectedSize(AD_SIZES.find(s => s.name === e.target.value) || AD_SIZES[0])}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {AD_SIZES.map(size => (
                    <option key={size.name} value={size.name}>
                      {size.name} ({size.width}x{size.height})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Template Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {TEMPLATES.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`h-16 rounded-lg border-2 transition-all ${
                        selectedTemplate.id === template.id ? 'border-purple-500 scale-105' : 'border-gray-600'
                      }`}
                      style={{ background: template.gradient }}
                      title={template.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your headline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Headline Size: {fontSize}px</label>
                <input
                  type="range"
                  min="24"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subheadline</label>
                <input
                  type="text"
                  value={subheadline}
                  onChange={(e) => setSubheadline(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter subheadline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subheadline Size: {subFontSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="72"
                  value={subFontSize}
                  onChange={(e) => setSubFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Call to Action</label>
                <input
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Shop Now, Learn More"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showLogo}
                    onChange={(e) => setShowLogo(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Show Logo/Brand</span>
                </label>
              </div>

              {showLogo && (
                <div>
                  <label className="block text-sm font-medium mb-2">Brand/Logo Text</label>
                  <input
                    type="text"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your brand name"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Preview</h2>
            <div className="flex justify-center items-center bg-gray-700 rounded-lg p-8 min-h-[400px]">
              <div
                ref={adRef}
                style={{
                  width: `${selectedSize.width}px`,
                  height: `${selectedSize.height}px`,
                  background: selectedTemplate.gradient,
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                }}
                className="relative flex flex-col items-center justify-center p-8 overflow-hidden"
              >
                {showLogo && (
                  <div
                    style={{
                      color: selectedTemplate.textColor,
                      fontSize: `${fontSize * 0.4}px`,
                    }}
                    className="absolute top-8 left-8 font-bold tracking-wider"
                  >
                    {logoText}
                  </div>
                )}

                <div className="text-center px-8">
                  <h1
                    style={{
                      fontSize: `${fontSize}px`,
                      color: selectedTemplate.textColor,
                      lineHeight: 1.2,
                    }}
                    className="font-black mb-6 drop-shadow-lg"
                  >
                    {headline}
                  </h1>

                  <p
                    style={{
                      fontSize: `${subFontSize}px`,
                      color: selectedTemplate.textColor,
                    }}
                    className="font-semibold mb-8 drop-shadow-md"
                  >
                    {subheadline}
                  </p>

                  <button
                    style={{
                      fontSize: `${subFontSize * 0.8}px`,
                      backgroundColor: selectedTemplate.textColor === '#ffffff' ? '#000000' : '#ffffff',
                      color: selectedTemplate.textColor === '#ffffff' ? '#ffffff' : '#000000',
                      padding: `${subFontSize * 0.5}px ${subFontSize * 1.2}px`,
                    }}
                    className="font-bold rounded-full shadow-2xl hover:scale-105 transition-transform"
                  >
                    {cta}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={downloadAd}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Download High-Resolution Ad ({selectedSize.width}x{selectedSize.height})
            </button>
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">How to Create Professional Ads for Free</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">Using This Tool:</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                  <span>Select your ad size based on platform (Instagram, Facebook, YouTube, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                  <span>Choose a professional template style that matches your brand</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                  <span>Customize headline, subheadline, and call-to-action text</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
                  <span>Adjust font sizes for perfect visual hierarchy</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">5</span>
                  <span>Download your high-resolution ad (2x pixel ratio for crisp quality)</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">Additional Free AI Tools:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span><strong>Canva Free:</strong> Advanced design templates with AI background remover</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span><strong>Playground AI:</strong> Generate custom images from text descriptions (500 images/day free)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span><strong>Leonardo.ai:</strong> High-quality AI image generation (150 credits/day free)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span><strong>Bing Image Creator:</strong> Powered by DALL-E, unlimited free generations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span><strong>Remove.bg:</strong> Free AI background removal for product photos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span><strong>Upscale.media:</strong> Free AI image upscaling for higher resolution</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span><strong>Copy.ai:</strong> Generate ad copy and headlines with AI (2,000 words/month free)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-pink-400">Pro Tips for High-Quality Ads:</h3>
            <div className="grid md:grid-cols-3 gap-6 text-gray-300">
              <div>
                <h4 className="font-bold text-purple-400 mb-2">Design Principles</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Keep text short and impactful</li>
                  <li>• Use high contrast for readability</li>
                  <li>• Limit to 2-3 colors maximum</li>
                  <li>• Leave plenty of white/negative space</li>
                  <li>• Make CTA buttons large and clear</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-purple-400 mb-2">Technical Quality</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Always download at full resolution</li>
                  <li>• Use platform-specific dimensions</li>
                  <li>• Test on mobile and desktop views</li>
                  <li>• Ensure text is readable when scaled</li>
                  <li>• Export as PNG for best quality</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-purple-400 mb-2">Marketing Best Practices</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Start with a compelling benefit</li>
                  <li>• Create urgency (limited time, stock)</li>
                  <li>• Use action verbs in CTA</li>
                  <li>• A/B test different versions</li>
                  <li>• Match ad style to brand identity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
