"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  suggestInspections,
  type SuggestInspectionsOutput,
} from '@/ai/flows/suggest-inspections';
import { Loader2, Sparkles, Lightbulb, AlertTriangle } from 'lucide-react';

const formSchema = z.object({
  report: z
    .string()
    .min(50, { message: 'Laporan harus memiliki panjang minimal 50 karakter.' })
    .max(5000, { message: 'Laporan tidak boleh lebih dari 5000 karakter.' }),
});

export function InspectionForm() {
  const [result, setResult] = useState<SuggestInspectionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      report: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await suggestInspections({ report: values.report });
      setResult(output);
    } catch (error) {
      console.error('Pemeriksaan AI gagal:', error);
      toast({
        variant: 'destructive',
        title: 'Kesalahan',
        description:
          'Gagal mendapatkan saran dari AI. Silakan coba lagi nanti.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Kirim Laporan</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="report"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Laporan Status Peralatan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="contoh, Getaran: 0.5 mm/s, Suhu: 65°C, Tekanan: 150 PSI..."
                        className="min-h-[200px] lg:min-h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Analisis Laporan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {isLoading && (
          <Card className="flex flex-col items-center justify-center min-h-[300px]">
            <CardContent className="flex flex-col items-center gap-4 text-center p-6">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h3 className="font-headline text-xl font-semibold">
                Menganalisis...
              </h3>
              <p className="text-muted-foreground">
                AI kami sedang memeriksa laporan Anda untuk anomali.
              </p>
            </CardContent>
          </Card>
        )}

        {result && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-accent" />
                  Anomali Terdeteksi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.anomalies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.anomalies.map((anomaly, index) => (
                      <Badge key={index} variant="destructive">
                        {anomaly}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Tidak ada anomali signifikan yang terdeteksi.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="text-accent" />
                  Penalaran AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.reasoning}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
