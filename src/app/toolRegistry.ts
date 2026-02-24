import type { ToolRoute, ToolSection, ToolSectionWithRoutes } from './types'
import { Base64Page } from '../pages/tools/Base64Page'
import { CsvViewerPage } from '../pages/tools/CsvViewerPage'
import { FileUploadPage } from '../pages/tools/FileUploadPage'
import { HashGeneratorPage } from '../pages/tools/HashGeneratorPage'
import { JsonFormatterPage } from '../pages/tools/JsonFormatterPage'
import { JwtDecoderPage } from '../pages/tools/JwtDecoderPage'
import { PasswordGeneratorPage } from '../pages/tools/PasswordGeneratorPage'
import { QrGeneratorPage } from '../pages/tools/QrGeneratorPage'
import { QrScannerPage } from '../pages/tools/QrScannerPage'
import { TextDiffPage } from '../pages/tools/TextDiffPage'
import { TimestampConverterPage } from '../pages/tools/TimestampConverterPage'
import { UrlBuilderPage } from '../pages/tools/UrlBuilderPage'
import { UrlEncodeDecodePage } from '../pages/tools/UrlEncodeDecodePage'
import { UuidGeneratorPage } from '../pages/tools/UuidGeneratorPage'

export const TOOL_SECTIONS: ToolSection[] = [
  {
    id: 'capture',
    label: 'Capture & Sharing',
    description: 'Camera, upload, and QR workflows for quick content exchange.',
  },
  {
    id: 'data',
    label: 'Data Transformation',
    description: 'Encoding, formatting, and data conversion utilities.',
  },
  {
    id: 'security',
    label: 'Security & Identity',
    description: 'Token, hash, identity, and credential helper tools.',
  },
  {
    id: 'productivity',
    label: 'Productivity',
    description: 'Common engineering helpers used across enterprise apps.',
  },
]

export const TOOL_ROUTES: ToolRoute[] = [
  {
    path: '/qr-scanner',
    name: 'QR Scanner',
    summary: 'Scan QR payloads via webcam in a mobile-style scanner view.',
    sectionId: 'capture',
    sectionLabel: 'Capture & Sharing',
    icon: 'qr_scanner',
    component: QrScannerPage,
  },
  {
    path: '/qr-generator',
    name: 'QR Generator',
    summary: 'Generate downloadable QR images from URL or plain text payload.',
    sectionId: 'capture',
    sectionLabel: 'Capture & Sharing',
    icon: 'qr_generator',
    component: QrGeneratorPage,
  },
  {
    path: '/file-upload',
    name: 'File Upload',
    summary: 'Drag-and-drop file intake with metadata preview.',
    sectionId: 'capture',
    sectionLabel: 'Capture & Sharing',
    icon: 'file_upload',
    component: FileUploadPage,
  },
  {
    path: '/json-formatter',
    name: 'JSON Formatter',
    summary: 'Format, minify, validate, and copy JSON payloads.',
    sectionId: 'data',
    sectionLabel: 'Data Transformation',
    icon: 'json_formatter',
    component: JsonFormatterPage,
  },
  {
    path: '/csv-viewer',
    name: 'CSV Viewer',
    summary: 'Parse CSV text into table rows for quick review.',
    sectionId: 'data',
    sectionLabel: 'Data Transformation',
    icon: 'csv_viewer',
    component: CsvViewerPage,
  },
  {
    path: '/base64',
    name: 'Base64 Tool',
    summary: 'Encode/decode UTF-8 content for transport-safe payloads.',
    sectionId: 'data',
    sectionLabel: 'Data Transformation',
    icon: 'base64',
    component: Base64Page,
  },
  {
    path: '/url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    summary: 'Encode and decode URL components safely.',
    sectionId: 'data',
    sectionLabel: 'Data Transformation',
    icon: 'url_codec',
    component: UrlEncodeDecodePage,
  },
  {
    path: '/text-diff',
    name: 'Text Diff',
    summary: 'Compare two text blocks line-by-line.',
    sectionId: 'data',
    sectionLabel: 'Data Transformation',
    icon: 'text_diff',
    component: TextDiffPage,
  },
  {
    path: '/jwt-decoder',
    name: 'JWT Decoder',
    summary: 'Decode JWT header and payload claims quickly.',
    sectionId: 'security',
    sectionLabel: 'Security & Identity',
    icon: 'jwt_decoder',
    component: JwtDecoderPage,
  },
  {
    path: '/hash-generator',
    name: 'Hash Generator',
    summary: 'Generate SHA-256 fingerprint for text values.',
    sectionId: 'security',
    sectionLabel: 'Security & Identity',
    icon: 'hash',
    component: HashGeneratorPage,
  },
  {
    path: '/uuid-generator',
    name: 'UUID Generator',
    summary: 'Create random UUID values for entity identifiers.',
    sectionId: 'security',
    sectionLabel: 'Security & Identity',
    icon: 'uuid',
    component: UuidGeneratorPage,
  },
  {
    path: '/password-generator',
    name: 'Password Generator',
    summary: 'Generate secure random passwords using crypto entropy.',
    sectionId: 'security',
    sectionLabel: 'Security & Identity',
    icon: 'password',
    component: PasswordGeneratorPage,
  },
  {
    path: '/url-builder',
    name: 'URL Builder',
    summary: 'Compose API URLs with dynamic query params.',
    sectionId: 'productivity',
    sectionLabel: 'Productivity',
    icon: 'url_builder',
    component: UrlBuilderPage,
  },
  {
    path: '/timestamp-converter',
    name: 'Timestamp Converter',
    summary: 'Convert Unix timestamps and ISO date strings.',
    sectionId: 'productivity',
    sectionLabel: 'Productivity',
    icon: 'timestamp',
    component: TimestampConverterPage,
  },
]

export function getToolByPath(path: string): ToolRoute | undefined {
  return TOOL_ROUTES.find((route) => route.path === path)
}

export function getSectionedTools(): ToolSectionWithRoutes[] {
  return TOOL_SECTIONS.map((section) => ({
    ...section,
    routes: TOOL_ROUTES.filter((route) => route.sectionId === section.id),
  }))
}
