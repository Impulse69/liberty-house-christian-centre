import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  CalendarIcon,
  ImageIcon,
  UsersIcon,
  PlayIcon,
  CommentIcon,
  BellIcon,
  HomeIcon,
} from '@sanity/icons'

/** Custom desk structure with a singleton for Site Settings. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(
          S.documentList()
            .title('Site Settings')
            .schemaType('siteSettings')
            .filter('_type == "siteSettings"'),
        ),
      S.divider(),
      S.documentTypeListItem('heroBanner').title('Hero Banners').icon(HomeIcon),
      S.documentTypeListItem('leader').title('Leadership').icon(UsersIcon),
      S.documentTypeListItem('sermon').title('Sermons').icon(PlayIcon),
      S.documentTypeListItem('event').title('Events & Programs').icon(CalendarIcon),
      S.documentTypeListItem('pastorQuote').title('Pastor Quotes').icon(CommentIcon),
      S.documentTypeListItem('galleryImage').title('Gallery').icon(ImageIcon),
      S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
    ])
