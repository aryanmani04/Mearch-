const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Mearch</h1>
        <p className="text-zinc-400 leading-relaxed mb-6">
          Mearch is something that i just thought of when i couldnt think of any
          movie. Mearch is derived from Movie search
        </p>
        <div className="border-t border-zinc-800 pt-6">
          <p className="text-zinc-500 text-sm leading-relaxed">
            This is my first proper React project after learning the
            fundamentals of JavaScript and React — components, props, hooks,
            state, routing, and working with a real external API. Mearch started
            as a way to put all of that into practice and build something I'd
            actually want to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;