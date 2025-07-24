import { InspectionForm } from './inspection-form';

export default function InspectionPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 animate-in fade-in-0 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Deteksi Anomali AI
        </h1>
        <p className="text-muted-foreground">
          Tempel laporan status peralatan di bawah ini. AI akan menganalisisnya dan
          menyarankan bidang yang mungkin memerlukan pemeriksaan lebih lanjut.
        </p>
      </div>
      <InspectionForm />
    </main>
  );
}
