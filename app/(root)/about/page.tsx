import { Heart, Users, Leaf} from "lucide-react";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Our Story
                  </h1>
                  <p className="text-muted-foreground md:text-base">
                    For over three decades, we've been weaving stories of
                    tradition, sustainability, and craftsmanship into every
                    garment we create. Our journey began in the remote villages
                    of Nepal, where ancient techniques meet modern design. At
                    Himalayan Garment, each piece reflects the spirit of the
                    Himalayas—rooted in culture, shaped by skilled hands, and
                    guided by a deep respect for nature. From sourcing ethically
                    produced natural fibers to preserving traditional
                    hand-weaving and dyeing methods, we are deeply committed to
                    honoring our heritage while embracing innovation. Every
                    fabric we use carries the essence of the mountains and the
                    story of the artisans behind it—men and women whose
                    knowledge has been passed down through generations.
                  </p>

                  <p className="text-muted-foreground md:text-base">
                    We believe clothing should not only look good but also do
                    good. That’s why we work closely with local communities,
                    ensuring fair wages, safe working environments, and the
                    empowerment of women in rural areas. Sustainability is not
                    just a choice for us—it’s a responsibility. We minimize
                    waste, reduce our carbon footprint, and prioritize
                    environmentally friendly processes at every stage of
                    production. Himalayan Garment isn’t just a brand; it’s a
                    movement to reconnect fashion with purpose. When you wear
                    our garments, you're not only wearing style—you're wearing a
                    story, a culture, and a commitment to a better world.
                  </p>
                </div>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="600"
                height="600"
                alt="Himalayan landscape with traditional weaving"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
        {/* Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primarymain text-white px-3 py-1 text-sm">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Preserving Heritage, Empowering Communities
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We believe that every thread tells a story. Our mission is to
                  preserve the rich textile heritage of the Himalayas while
                  providing sustainable livelihoods to local artisans and their
                  families.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://images.unsplash.com/photo-1521316730702-829a8e30dfd0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="600"
                height="400"
                alt="Artisan weaving traditional fabric"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <Heart className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold">Ethical Production</h3>
                      <p className="text-muted-foreground">
                        Fair wages, safe working conditions, and respect for
                        traditional craftsmanship methods.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Leaf className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold">
                        Sustainable Materials
                      </h3>
                      <p className="text-muted-foreground">
                        Organic cotton, yak wool, and natural dyes sourced
                        responsibly from the Himalayan region.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-bold">Community Impact</h3>
                      <p className="text-muted-foreground">
                        Supporting over 200 artisan families across Nepal,
                        Tibet, and Bhutan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Our Impact
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Numbers that tell the story of our commitment to people and
                  planet.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">
                  Artisan Families Supported
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl font-bold text-primary">30+</div>
                <div className="text-sm text-muted-foreground">
                  Years of Experience
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">
                  Villages Partnered
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">
                  Fair Trade Certified
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[600px_1fr]">
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="600"
                height="600"
                alt="Founder with local artisans"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-primarymain text-white px-3 py-1 text-sm">
                    Our Founder
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    A Journey That Started with a Single Thread
                  </h2>
                  <p className="text-muted-foreground md:text-lg">
                    {
                      "In 1992, our founder Pemba Sherpa was trekking through a remote village in the Everest region when she encountered a group of women weaving the most beautiful textiles she had ever seen. Despite their incredible skill, these artisans struggled to find markets for their work."
                    }
                  </p>
                  <p className="text-muted-foreground md:text-lg">
                    {
                      "That moment sparked an idea that would become Himalayan Garments. What started as a small initiative to help a handful of weavers has grown into a global brand that supports hundreds of artisan families while bringing the beauty of Himalayan craftsmanship to the world."
                    }
                  </p>
                  <p className="text-muted-foreground md:text-lg">
                    {
                      "Today, we continue to honor that original vision: creating beautiful, sustainable clothing while empowering the communities that make it all possible."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
