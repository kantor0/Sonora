import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface TermsType{
    handleclick?: () => void
    useInternal?: boolean
}


export default function Terms({handleclick = () =>{}, useInternal = true}: TermsType){
    const navigate = useNavigate();
    const navigateBack = () =>{
        navigate(-1)
    }
    const onClick = () =>{
        if(useInternal){
            navigateBack()
        }else{
            handleclick()
        }
    }
    return (
        <div className="-mx-5 -mt-5 space-y-4.5">
            <button onClick={onClick} className="flex items-center mt-2 text-ink-soft font-bold cursor-pointer mb-5"><ChevronLeft size={18} /> <span>Back</span></button>
            <div>
                <h2 className="text-2xl md:text-4xl uppercase tracking-wide font-bold font-grotesk text-clayark">Sonora - Terms & Conditions</h2>
                <p className="text-lg md:text-xl mt-1.5 flex gap-1.5 flex-wrap text-ink-soft">Last updated: <span className="text-ink">Tuesday, October 27 2026</span></p>
            </div>
            <div className="space-y-5">
                <p className="text-xl tracking-normal text-clayark font-bold font-sans text-justify">Hi, this is Sonora. We keep this simple, no lawyer grammer</p>
                <div className="bg-paper border border-line flex flex-col gap-4.5 rounded-xl p-6 mb-5">
                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>1.</span><span className="font-semibold text-ink">Agreement</span></p>
                        <p className="text-ink-soft">By using Sonora, you agree to these terms, If you don't agree, please don't use the app. Sonora is for personal music listening only.</p>
                    </div>

                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>2.</span><span className="font-semibold text-ink">Your Account</span></p>
                        <p className="text-ink-soft">Sonora doesn't have passwords or email login yet. You create a local profile with:</p>
                        <ul className="text-ink-soft">
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>Username</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>Display Name</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>Favorite Artist, Genre, and Mood</span>
                            </li>
                        </ul>
                        <p className="text-ink-soft">This profile is saved only on your device in localStorage. We don't store it on any server.</p>
                        <p className="text-ink-soft mt-3">We use your Favorite Artist, Genre, and Mood to generate your feed. These recommendations come from the itunes Search API.</p>
                    </div>

                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>3.</span><span className="font-semibold text-ink">What we save & where</span></p>
                        <p className="text-ink-soft">We save everything on <span className="text-ink font-bold">YOUR</span> device, not our cloud because we are broke and growing developers.</p>
                        <div>
                            <h4 className="text-ink-soft font-semibold text-lg">localStorage:</h4>
                            <ul className="text-ink-soft">
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Your profile (username, display name, favorites)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>App settings and preferences</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Toast preferences</span>
                                </li>
                            </ul>

                            <h4 className="text-ink-soft font-semibold mt-3 text-lg">IndexDB(on your browser):</h4>
                            <ul className="text-ink-soft">
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Your playlists</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Liked songs</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>YouTube imports</span>
                                </li>
                            </ul>
                            <h4 className="text-ink-soft font-semibold mt-3 text-lg">Local Folder(with your permission):</h4>
                            <p className="text-ink-soft">When you import local music, we will ask for folder permission first. We use the browser File System API(showDirectoryPicker).</p>
                        </div>
                        <p className="text-ink-soft font-bold">We don't have a database yet. Everything is local.</p>
                    </div>

                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>4.</span><span className="font-semibold text-ink">Youtube Imports</span></p>
                        <p className="text-ink-soft">You can import music via YouTube links for personal listening only.</p>
                        <ul className="text-ink-soft space-y-1.5">
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>You are responsible for the links you add</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>We fetch title/thumbnail using public YouTube info and stream via third-party parser</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>Youtube content is subject to YouTube's Terms. If a link breaks or is removed on YouTube, it will break in Sonora too</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>We are testing this feature. It may play as audio or video depending on availability. There are other methods to convert links, we are exploring them.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>5.</span><span className="font-semibold text-ink">iTunes & Recommedations</span></p>
                        <p className="text-ink-soft">Our <span className="text-ink font-semibold">"Recommended"</span>, <span className="text-ink font-semibold">"More Like You"</span>, and <span className="text-ink font-semibold">"You May Like"</span> sections use the iTunes Search API. We don't own this music, we just show previews to help you discover. All iTunes content beelongs to Apple and respective artists.</p>
                    </div>

                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>6.</span><span className="font-semibold text-ink">Your Content & Rules</span></p>
                        <div>
                            <h4 className="text-ink-soft font-semibold text-lg">You can:</h4>
                            <ul className="text-ink-soft">
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Create playlists</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Like songs</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Import your own local music</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Import Youtube links for personal use</span>
                                </li>
                            </ul>
                            <h4 className="text-ink-soft mt-3 font-semibold text-lg">You can't:</h4>
                            <ul className="text-ink-soft">
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Upload or claim someone else's music as yours</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Use Sonora for piracy, hate, or spam</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="bg-ink-soft w-4 h-0.5"></div>
                                    <span>Try to break or reverse-engineer the app</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>7.</span><span className="font-semibold text-ink">Deleting your Data</span></p>
                        <p className="text-ink-soft">If you choose to delete your account/profile in Settings, we will delete <span className="text-ink font-bold">EVERYTHING</span>:</p>
                        <ul className="text-ink-soft">
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>Your username and display name</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>All playlists, liked songs, Yoube imports</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>Your settings</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-ink-soft w-4 h-0.5"></div>
                                <span>Local folder access</span>
                            </li>
                        </ul>
                        <p className="text-ink-soft">This is permanent and happens on your device. There is no undo because we don't have a backup server.</p>
                    </div>

                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>8.</span><span className="font-semibold text-ink">No Warranty</span></p>
                        <p className="text-ink-soft">Sonora is provided <span className="text-ink font-bold">"as is"</span>. Your local files may require permission again after browser updates. YouTube and iTunes APIs may change, so some features may stop working temporarily.</p>

                    </div>

                    <div className="border-b border-clayark pb-3 space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>9.</span><span className="font-semibold text-ink">Changes</span></p>
                        <p className="text-ink-soft">If we change these terms, we will update the <span className="text-ink font-bold">"Last updated"</span> date above. Continued use means you agree.</p>
                    </div>

                    <div className="space-y-1.5">
                        <p className="flex uppercase text-lg text-ink items-center gap-2"><span>10.</span><span className="font-semibold text-ink">Contact</span></p>
                        <p className="text-ink-soft">This is a local-first project. If you have questions, contact us inside the app feedback</p>
                    </div>
                </div>
            </div>
            <p className="text-ink-soft font-semibold text-justify"><span className="text-ink font-bold">In short:</span> You own your music. We just help you play it . Everything stays on your phone/computer.</p>
        </div>
    )
}