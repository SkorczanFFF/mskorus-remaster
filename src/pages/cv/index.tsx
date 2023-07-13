// eslint-disable-next-line @next/next/no-document-import-in-page
import React from 'react';
import { AiFillGithub, AiFillHtml5 } from 'react-icons/ai';
import { BsDot, BsGithub, BsGlobe2 } from 'react-icons/bs';
import { IoLogoReact } from 'react-icons/io5';
import {
  SiAdobephotoshop,
  SiAutodesk,
  SiBitbucket,
  SiFirebase,
  SiGitlab,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVisualstudiocode,
  SiYarn,
} from 'react-icons/si';

const technos = [
  { icon: <AiFillHtml5 className='text-6xl' />, label: 'HTML5' },
  { icon: <SiTypescript className='text-6xl' />, label: 'TypeScript' },
  { icon: <SiNextdotjs className='text-6xl' />, label: 'Next.js' },
  { icon: <IoLogoReact className='text-6xl' />, label: 'React' },
  { icon: <SiRedux className='text-6xl' />, label: 'Redux' },
  { icon: <SiThreedotjs className='text-6xl' />, label: 'Three.js' },
  { icon: <SiTailwindcss className='text-6xl' />, label: 'Tailwind' },
  { icon: <SiSass className='text-6xl' />, label: 'Sass' },
  { icon: <SiFirebase className='text-6xl' />, label: 'Firebase' },
  { icon: <SiMongodb className='text-6xl' />, label: 'MongoDB' },
  { icon: <SiNodedotjs className='text-6xl' />, label: 'Node.js' },
  { icon: <SiAdobephotoshop className='text-6xl' />, label: 'Photoshop' },
  { icon: <SiAutodesk className='text-6xl' />, label: '3Ds Max' },
  { icon: <AiFillGithub className='text-6xl' />, label: 'GitHub' },
  { icon: <SiGitlab className='text-6xl' />, label: 'GitLab' },
  { icon: <SiBitbucket className='text-6xl' />, label: 'BitBucket' },
  { icon: <SiVisualstudiocode className='text-6xl' />, label: 'VS Code' },
  { icon: <SiYarn className='text-6xl' />, label: 'Yarn' },
  { icon: <SiNpm className='text-6xl' />, label: 'npm' },
];

export default function CV(): JSX.Element {
  return (
    <>
      <section className='font-mont flex flex-col items-center bg-[#121d12]'>
        <div className='m-10 flex h-[2015px] w-[1421px] bg-white'>
          <div className='flex w-full bg-red-300'>
            <div className='flex h-[2015px] w-[380px] flex-col bg-gradient-to-b from-[#20252f] from-0% via-[#20252f] via-60% to-[#2b3240] to-100%'>
              <div className='arrow-top-left white' />
              <div className='flex flex-col items-center justify-center'>
                <p className='ml-[35px] mt-[25px] text-[3rem] font-[200] tracking-[32px] text-white'>
                  MACIEJ
                </p>
                <p className='z-10 ml-[30px] mt-[28px] text-[3.25rem] tracking-[23px] text-white'>
                  SKORUS
                </p>
                <div className='to-raspberry via-raspberry -mt-[15px] h-[4px] w-full bg-gradient-to-r from-transparent' />
              </div>
              <div className='mt-[65px]'>
                <div className='h-[4px] w-[95%] bg-gradient-to-r from-white from-10% to-transparent to-100%' />
                <img
                  src='/cvphoto.png'
                  alt='Me'
                  className='mx-auto mt-[60px] w-[70%]'
                />
                <div className='to-raspberry via-raspberry mt-[60px] h-[4px] w-full bg-gradient-to-r from-transparent' />
                <div className='mt-5 flex flex-col items-end'>
                  <div className='mt-[7px] flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>ABOUT</p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <p className='mx-4 mr-9 mt-2 text-end text-xl text-white'>
                    Hey I'm Maciej and I'm looking for my first job to start
                    creating much more amazin web pages. I like exploring new
                    technologies and isert them for unique user experience.
                  </p>
                </div>
                <div className='mt-5 flex flex-col items-end'>
                  <div className='flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>
                      CONTACT
                    </p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <div className='mx-4 mr-9 mt-2 flex flex-col gap-1 text-end text-xl text-white'>
                    <a href=''>skorusmaciej94@gmail.com</a>
                    <a href=''>tel. +48 668 366 648</a>
                  </div>
                </div>
                <div className='mt-5 flex flex-col items-end'>
                  <div className='flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>
                      LANGUAGES
                    </p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <div className='mx-4 mr-9 mt-2 flex flex-col text-end text-xl text-white'>
                    <p className=''>English - C1</p>
                    <p className=''>Russian - A2</p>
                    <p className=''>Polish - native</p>
                  </div>
                </div>
                <div className='mt-5 flex flex-col items-end'>
                  <div className='flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>LINKS</p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <div className='mx-4 mr-9 mt-2 flex flex-col text-end text-xl text-white'>
                    <p className='flex items-center gap-2'>
                      /skorczanFFF <BsGithub className='-mt-[2px]' />
                    </p>
                    <p className=''>/mskorus</p>
                    <p className=''>portfolio page</p>
                  </div>
                </div>
                <div className='mt-5 flex flex-col items-end'>
                  <div className='flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>
                      HOBBIES
                    </p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <div className='mx-4 mr-9 mt-2 flex flex-col text-end text-xl text-white'></div>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex h-[90px] w-full items-center bg-[#20252f] text-white'>
                <p className='right-0 ml-[100px] text-3xl font-[300] tracking-[15px]'>
                  JUNIOR FRONTEND DEVELOPER
                </p>
              </div>
              <div className='flex'>
                <div className='bg-raspberry h-[1929px]'>
                  <div className='arrow-top-left cv-blue' />
                </div>
                <div className='flex h-[1922px] w-[1011px] flex-col bg-white'>
                  <div className='mt-[54px]' />
                  <div className='flex w-full'>
                    <div className='cv-arrow' />
                    <div className=' flex flex-col text-[#20252f]'>
                      <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                        EXPERIENCE
                      </p>
                      <div className='ml-6 mt-3'>
                        <p className='text-2xl font-[500] tracking-[5px]'>
                          ANFATA GAMES SP. Z O.O.
                        </p>
                        <div className='mb-4 mt-2 flex items-center gap-5 text-2xl tracking-[2px]'>
                          <p>JUNIOR FRONTEND DEVELOPER</p>
                          <p className='text-raspberry text-lg'>
                            [ September 2022 - June 2023 ]
                          </p>
                        </div>
                        <div className='ml-1 flex w-full flex-col items-start gap-2 text-xl'>
                          <p className='flex'>
                            <BsDot className='mt-1' />
                            <p className='mr-4'>
                              dApp and auction system developement with
                              ImmutableX and smart contracts integration
                            </p>
                          </p>
                          <p className='flex'>
                            <BsDot className='mt-1' />
                            Front-end interactions with smart contracts
                          </p>
                          <p className='flex'>
                            <BsDot className='mt-1' />
                            full cross-team collaboration
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-10 flex w-full'>
                    <div className='cv-arrow' />
                    <div className=' flex flex-col text-[#20252f]'>
                      <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                        EDUCATION
                      </p>
                      <div className='ml-6 mt-3'>
                        <p className='text-2xl font-[500] tracking-[5px]'>
                          UNIVERSITY OF SILESIA
                        </p>
                        <p className='mb-4 mt-2 text-2xl tracking-[1px]'>
                          INFORMATICS - Web Application Programming
                        </p>
                        <div className='ml-1 flex items-center text-[22px]'>
                          <BsDot /> Enigneer degree • October 2017 - June 2021{' '}
                          <BsDot />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-10 flex w-full'>
                    <div className='cv-arrow' />
                    <div className=' flex flex-col text-[#20252f]'>
                      <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                        PROJECTS
                      </p>
                      <div className='ml-6 mt-3'>
                        <p className='text-2xl font-[500] tracking-[5px]'>
                          PORTFOLIO PAGE
                        </p>
                        <div className='flex flex-col'>
                          <p className='ml-2 mr-8 mt-2 flex items-center text-xl'>
                            Remaster of my deprecated React portfolio page. Now
                            it is based on Next.js, TailwindCSS and React Three
                            Fiber/Three.js. Integrated with Typescript and
                            built-in CV on Web.
                          </p>
                          <div className='ml-4 mt-2 flex gap-10 text-xl'>
                            <div className='flex items-center gap-2'>
                              <AiFillGithub className='text-3xl' /> <p>repo</p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <BsGlobe2 className='text-2xl' /> <p>web demo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='ml-6 mt-6'>
                        <p className='text-2xl font-[500] tracking-[5px]'>
                          POLONEZ AUTODRIVE
                        </p>
                        <div className='flex flex-col'>
                          <p className='ml-2 mr-8 mt-2 flex items-center text-xl'>
                            Simple Three.js scene made with 3Ds Max 2019. Models
                            with animations were exported to .fbx files and
                            baked into Synthwave/80's vibe "coloring book"
                            animation with GUI for full experience.
                          </p>
                          <div className='ml-4 mt-2 flex gap-10 text-xl'>
                            <div className='flex items-center gap-2'>
                              <AiFillGithub className='text-3xl' /> <p>repo</p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <BsGlobe2 className='text-2xl' /> <p>web demo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='ml-6 mt-6'>
                        <p className='text-2xl font-[500] tracking-[5px]'>
                          YET ANOTHER WEATHER APP
                        </p>
                        <div className='flex flex-col'>
                          <p className='ml-2 mr-8 mt-2 flex items-center text-xl'>
                            Simple Three.js scene made with 3Ds Max 2019. Models
                            with animations were exported to .fbx files and
                            baked into Synthwave/80's vibe "coloring book" like
                            animation with GUI for full experience.
                          </p>
                          <div className='ml-4 mt-2 flex gap-10 text-xl'>
                            <div className='flex items-center gap-2'>
                              <AiFillGithub className='text-3xl' /> <p>repo</p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <BsGlobe2 className='text-2xl' /> <p>web demo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-10 flex w-full'>
                        <div className='cv-arrow -ml-[21px]' />
                        <div className=' flex flex-col text-[#20252f]'>
                          <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                            SKILLS
                          </p>
                          <div className='mr-2 mt-6 flex flex-wrap justify-start gap-x-[25px] gap-y-2'>
                            {technos.map((techno, index) => (
                              <div
                                key={index}
                                className='hover:text-raspberry mb-3 flex w-[54px] cursor-pointer flex-col items-center text-[#20252ff6] duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]'
                              >
                                {techno.icon}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
