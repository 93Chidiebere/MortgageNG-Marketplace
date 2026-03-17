import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Loader2, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import type { ApplicationFormData } from '../ApplicationWizard';

const kycSchema = z.object({
  bvn: z.string().length(11, 'BVN must be exactly 11 digits').regex(/^\d+$/, 'BVN must contain only numbers'),
  nin: z.string().length(11, 'NIN must be exactly 11 digits').regex(/^\d+$/, 'NIN must contain only numbers'),
});

type KYCFormData = z.infer<typeof kycSchema>;

interface KYCStepProps {
  formData: ApplicationFormData;
  updateFormData: (updates: Partial<ApplicationFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function KYCStep({ formData, updateFormData, onNext, onPrev }: KYCStepProps) {
  const [isVerifyingBVN, setIsVerifyingBVN] = useState(false);
  const [isVerifyingNIN, setIsVerifyingNIN] = useState(false);
  const [bvnVerified, setBvnVerified] = useState(formData.bvnVerified);
  const [ninVerified, setNinVerified] = useState(formData.ninVerified);
  const [bvnError, setBvnError] = useState<string | null>(null);
  const [ninError, setNinError] = useState<string | null>(null);

  const form = useForm<KYCFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      bvn: formData.bvn,
      nin: formData.nin,
    },
  });

  const verifyBVN = async () => {
    const bvn = form.getValues('bvn');
    const result = kycSchema.shape.bvn.safeParse(bvn);
    
    if (!result.success) {
      form.setError('bvn', { message: result.error.errors[0].message });
      return;
    }

    setIsVerifyingBVN(true);
    setBvnError(null);
    
    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock: BVN starting with 22 fails
    if (bvn.startsWith('22')) {
      setBvnError('BVN verification failed. Please check and try again.');
      setBvnVerified(false);
    } else {
      setBvnVerified(true);
      updateFormData({ bvn, bvnVerified: true });
    }
    
    setIsVerifyingBVN(false);
  };

  const verifyNIN = async () => {
    const nin = form.getValues('nin');
    const result = kycSchema.shape.nin.safeParse(nin);
    
    if (!result.success) {
      form.setError('nin', { message: result.error.errors[0].message });
      return;
    }

    setIsVerifyingNIN(true);
    setNinError(null);
    
    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock: NIN starting with 00 fails
    if (nin.startsWith('00')) {
      setNinError('NIN verification failed. Please check and try again.');
      setNinVerified(false);
    } else {
      setNinVerified(true);
      updateFormData({ nin, ninVerified: true });
    }
    
    setIsVerifyingNIN(false);
  };

  const canProceed = bvnVerified && ninVerified;

  const handleContinue = () => {
    if (canProceed) {
      updateFormData({
        bvn: form.getValues('bvn'),
        nin: form.getValues('nin'),
        bvnVerified,
        ninVerified,
      });
      onNext();
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          KYC Verification
        </CardTitle>
        <CardDescription>
          Complete your identity verification once. Your verified information will be shared securely with selected lenders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertTitle>One-Time Verification</AlertTitle>
          <AlertDescription>
            Your KYC data is encrypted and stored securely. You won't need to verify again for future applications.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form className="space-y-6">
            {/* BVN Verification */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="bvn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Verification Number (BVN)</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input 
                          placeholder="12345678901" 
                          maxLength={11}
                          disabled={bvnVerified}
                          className={cn(
                            bvnVerified && "bg-primary/5 border-primary"
                          )}
                          {...field} 
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant={bvnVerified ? "outline" : "default"}
                        onClick={verifyBVN}
                        disabled={isVerifyingBVN || bvnVerified}
                        className="min-w-[100px]"
                      >
                        {isVerifyingBVN ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : bvnVerified ? (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        ) : (
                          'Verify'
                        )}
                      </Button>
                    </div>
                    <FormDescription>
                      Your 11-digit BVN linked to your bank account
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {bvnVerified && (
                <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  BVN verified successfully
                </div>
              )}
              
              {bvnError && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 p-3 rounded-lg">
                  <XCircle className="w-4 h-4" />
                  {bvnError}
                </div>
              )}
            </div>

            {/* NIN Verification */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="nin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National Identification Number (NIN)</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input 
                          placeholder="12345678901" 
                          maxLength={11}
                          disabled={ninVerified}
                          className={cn(
                            ninVerified && "bg-primary/5 border-primary"
                          )}
                          {...field} 
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant={ninVerified ? "outline" : "default"}
                        onClick={verifyNIN}
                        disabled={isVerifyingNIN || ninVerified}
                        className="min-w-[100px]"
                      >
                        {isVerifyingNIN ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : ninVerified ? (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        ) : (
                          'Verify'
                        )}
                      </Button>
                    </div>
                    <FormDescription>
                      Your 11-digit NIN from NIMC
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {ninVerified && (
                <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  NIN verified successfully
                </div>
              )}
              
              {ninError && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 p-3 rounded-lg">
                  <XCircle className="w-4 h-4" />
                  {ninError}
                </div>
              )}
            </div>

            {/* Verification Status Summary */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <h4 className="font-medium text-sm">Verification Status</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  {bvnVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm",
                    bvnVerified ? "text-foreground" : "text-muted-foreground"
                  )}>
                    BVN Verified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {ninVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm",
                    ninVerified ? "text-foreground" : "text-muted-foreground"
                  )}>
                    NIN Verified
                  </span>
                </div>
              </div>
            </div>

            {!canProceed && (
              <Alert variant="destructive" className="border-amber-500/20 bg-amber-500/5 text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Please verify both BVN and NIN to continue with your application.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onPrev} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <Button 
                type="button" 
                onClick={handleContinue}
                disabled={!canProceed}
                className="gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
