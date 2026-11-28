import { SellerAuthShell } from '@/features/seller/components/SellerAuthShell';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return <SellerAuthShell>{children}</SellerAuthShell>;
}
