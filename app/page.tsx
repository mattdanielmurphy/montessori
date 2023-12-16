"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [index, setIndex] = useState(0);
  const lastIndex = 1;

  function handleNextButton() {
    if (index + 1 <= lastIndex) setIndex(index + 1);
  }
  function handlePrevButton() {
    if (index - 1 >= 0) setIndex(index - 1);
  }

  const iframe = document.querySelector("iframe");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe
        height="720"
        width="1280"
        src="https://mega.nz/embed/B51iAJpC#G3pa_g_dWZ1U5igBYSfzvxmJ8nHVUn-FmkeYgqjUAQk"
        allowFullScreen
      ></iframe>
      <nav>
        <button id="prev" onClick={handlePrevButton}>
          👈
        </button>
        <button id="next" onClick={handleNextButton}>
          👉
        </button>
      </nav>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-3xl font-semibold`}>
            <span className="inline-block transition-transform group-hover:scale-150 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
      </div>
    </main>
  );
}
