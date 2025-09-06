import { Button } from "./lib/ui/button";

function CodeSnippet() {
  return (
    <div className="absolute bottom-12 right-12 max-w-xs hidden lg:block">
      <div className="bg-dark-secondary-custom rounded-lg p-4 font-code text-sm text-text-secondary-custom border border-accent-custom/10">
        <div className="text-blue-400">class <span className="text-green-400">Engineer</span>{` {`}</div>
        <div className="px-4"><span className="text-purple-400">constructor</span>{`() {`}</div>
        <div className="px-8">this.name = <span className="text-yellow-300">"Andrés"</span>;</div>
        <div className="px-8">{`this.skills = [`}<span className="text-yellow-300">"AI"</span>, <span className="text-yellow-300">"Full-Stack"</span>{`];`}</div>
        <div className="px-8">this.experience = <span className="text-blue-300">7</span>;</div>
        <div className="px-4">{`}`}</div>
        <div className="text-blue-400">{`}`}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="flex-1 flex items-center justify-center">
      <div className="w-full px-8">
        <div className="max-w-3xl flex flex-col items-start justify-start">
          <span className="text-sm font-code text-accent-custom mb-4">// Hi, my name is</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary-custom mb-4">Andrés Malvestiti</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-text-secondary-custom mb-6">Full-Stack Engineer & AI Specialist</h2>
          <p className="max-w-xl text-lg text-text-secondary-custom mb-8">7+ years building web apps with AI-augmented tools. Specializing in creating intelligent, responsive, and scalable applications that leverage the latest in artificial intelligence.</p>
          <div className="w-full sm:w-fit flex flex-col sm:flex-row gap-x-4 gap-y-4">
            <Button size="lg" className="h-auto px-6 py-3 text-md font-medium">View Experience</Button>
            <Button variant="outline" size="lg" className="h-auto px-6 py-3 text-md font-medium">Chat with my AI</Button>
          </div>
        </div>
      </div>
      <CodeSnippet/>
    </section>
  );
}