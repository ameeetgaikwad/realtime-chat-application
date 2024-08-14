import { WebcamIcon } from "@/components/icons/webcam-icon";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          <WebcamIcon className="h-6 w-6" />
          <span className="sr-only">Messaging App</span>
        </Link>
        <div className="flex items-center gap-4">
          <SignedOut>
            <Button>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Seamless Multi-User Messaging
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Collaborate with your team, friends, and family through our
                  intuitive and secure messaging platform. Stay connected
                  anytime, anywhere.
                </p>
                <div className="space-x-4">
                  <SignedOut>
                    <Button>
                      <SignInButton />
                    </Button>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </div>
            <img
              src="/src/assets/chat.png"
              width="1270"
              height="300"
              alt="Hero"
              className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Powerful Messaging Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Communication
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our messaging app offers a suite of features to help you stay
                  connected and productive. From real-time chat to file-sharing,
                  we've got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Real-Time Messaging</h3>
                <p className="text-sm text-muted-foreground">
                  Instant communication with your team, friends, and family. No
                  more waiting for responses.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">File Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Easily share documents, images, and other files with your
                  contacts.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Group Conversations</h3>
                <p className="text-sm text-muted-foreground">
                  Collaborate with multiple people in the same chat, keeping
                  everyone on the same page.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Stay up-to-date with the latest messages and activity in your
                  conversations.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Secure Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  Your messages and data are protected with end-to-end
                  encryption, ensuring your privacy.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Cross-Platform Sync</h3>
                <p className="text-sm text-muted-foreground">
                  Access your messages and conversations from any device,
                  seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Messaging App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
