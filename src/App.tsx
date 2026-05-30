import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { VisionMission } from '@/pages/VisionMission'
import { Leadership } from '@/pages/Leadership'
import { Sermons } from '@/pages/Sermons'
import { SermonDetail } from '@/pages/SermonDetail'
import { Events } from '@/pages/Events'
import { EventDetail } from '@/pages/EventDetail'
import { Gallery } from '@/pages/Gallery'
import { Quotes } from '@/pages/Quotes'
import { Give } from '@/pages/Give'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vision-mission" element={<VisionMission />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="sermons" element={<Sermons />} />
        <Route path="sermons/:slug" element={<SermonDetail />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:slug" element={<EventDetail />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="give" element={<Give />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
