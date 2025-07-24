// src/ai/flows/suggest-inspections.ts
'use server';

/**
 * @fileOverview An anomaly detection AI agent.
 *
 * - suggestInspections - A function that suggests fields needing closer inspection.
 * - SuggestInspectionsInput - The input type for the suggestInspections function.
 * - SuggestInspectionsOutput - The return type for the suggestInspections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInspectionsInputSchema = z.object({
  report: z.string().describe('The equipment status report.'),
});
export type SuggestInspectionsInput = z.infer<typeof SuggestInspectionsInputSchema>;

const SuggestInspectionsOutputSchema = z.object({
  anomalies: z.array(z.string()).describe('The fields in the report that may need closer inspection.'),
  reasoning: z.string().describe('The reasoning behind the anomaly detection.'),
});
export type SuggestInspectionsOutput = z.infer<typeof SuggestInspectionsOutputSchema>;

export async function suggestInspections(input: SuggestInspectionsInput): Promise<SuggestInspectionsOutput> {
  return suggestInspectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInspectionsPrompt',
  input: {schema: SuggestInspectionsInputSchema},
  output: {schema: SuggestInspectionsOutputSchema},
  prompt: `You are an expert in anomaly detection in equipment status reports.

You will be given an equipment status report, and you will need to identify any fields that may need closer inspection.

Report: {{{report}}}

Identify the fields that may need closer inspection, and provide a reasoning for why they may need closer inspection.

Output the fields as a list of strings in the anomalies field, and the reasoning in the reasoning field.`, 
});

const suggestInspectionsFlow = ai.defineFlow(
  {
    name: 'suggestInspectionsFlow',
    inputSchema: SuggestInspectionsInputSchema,
    outputSchema: SuggestInspectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
