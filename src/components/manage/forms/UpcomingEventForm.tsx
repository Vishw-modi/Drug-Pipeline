'use client';

import React, { useState, useTransition } from 'react';
import { Drug } from '@/types/drug';
import { UpcomingEvent } from '@/types/event';
import { createEvent, updateEvent } from '@/app/actions/manage.actions';
import { RelationshipSelect } from '@/components/manage/fields/RelationshipSelect';

interface UpcomingEventFormProps {
  initialData?: UpcomingEvent | null;
  drugs: Drug[];
  trials: any[]; // using any for trial
  mode: 'create' | 'edit' | 'view';
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpcomingEventForm({ initialData, drugs, trials, mode, onSuccess, onCancel }: UpcomingEventFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isReadOnly = mode === 'view';
  const drugOptions = drugs.map(d => ({ id: d.id, label: d.drug_name }));
  
  // The trial options will just show NCT ID or name
  const trialOptions = trials.map(t => ({ 
    id: t.id, 
    label: t.nct_id ? `${t.nct_id} (${t.trial_name.substring(0, 30)}...)` : t.trial_name 
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReadOnly) return;
    
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const trialIdStr = formData.get('trial_id') as string;
    
    const data = {
      drug_id: parseInt(formData.get('drug_id') as string),
      trial_id: trialIdStr ? parseInt(trialIdStr) : null,
      event_name: formData.get('event_name') as string,
      event_type: formData.get('event_type') as string,
      expected_date: formData.get('expected_date') as string || null,
      actual_date: formData.get('actual_date') as string || null,
      status: formData.get('status') as string || null,
      importance: formData.get('importance') as string || null,
      description: formData.get('description') as string || null,
    };

    startTransition(async () => {
      let result;
      if (mode === 'edit' && initialData) {
        result = await updateEvent(initialData.id, data);
      } else {
        result = await createEvent(data);
      }

      if (result.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-8">
          
          {/* Section 1: Event Associations */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Event Associations
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Drug *</label>
                <RelationshipSelect 
                  id="drug_id"
                  name="drug_id"
                  options={drugOptions}
                  defaultValue={initialData?.drug_id}
                  disabled={isReadOnly}
                  required
                  placeholder="Select a drug..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Clinical Trial (Optional)</label>
                <RelationshipSelect 
                  id="trial_id"
                  name="trial_id"
                  options={trialOptions}
                  defaultValue={initialData?.trial_id}
                  disabled={isReadOnly}
                  placeholder="Link to a trial..."
                />
              </div>
            </div>
          </fieldset>

          {/* Section 2: Event Details */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Event Details
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Event Name *</label>
                <input
                  type="text"
                  name="event_name"
                  required
                  disabled={isReadOnly}
                  defaultValue={initialData?.event_name || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Event Type *</label>
                  <select
                    name="event_type"
                    required
                    disabled={isReadOnly}
                    defaultValue={initialData?.event_type || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  >
                    <option value="">Select type...</option>
                    <option value="FDA Approval">FDA Approval</option>
                    <option value="FDA Submission">FDA Submission</option>
                    <option value="PDUFA Date">PDUFA Date</option>
                    <option value="EMA Decision">EMA Decision</option>
                    <option value="ASCO Presentation">ASCO Presentation</option>
                    <option value="ESMO Presentation">ESMO Presentation</option>
                    <option value="AACR Presentation">AACR Presentation</option>
                    <option value="Topline Results">Topline Results</option>
                    <option value="Interim Analysis">Interim Analysis</option>
                    <option value="Phase I Initiation">Phase I Initiation</option>
                    <option value="Phase II Initiation">Phase II Initiation</option>
                    <option value="Phase III Initiation">Phase III Initiation</option>
                    <option value="Primary Completion">Primary Completion</option>
                    <option value="Clinical Readout">Clinical Readout</option>
                    <option value="Commercial Launch">Commercial Launch</option>
                    <option value="Conference Presentation">Conference Presentation</option>
                    <option value="Investor Event">Investor Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Status</label>
                  <select
                    name="status"
                    disabled={isReadOnly}
                    defaultValue={initialData?.status || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  >
                    <option value="">Select status...</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Importance</label>
                <select
                  name="importance"
                  disabled={isReadOnly}
                  defaultValue={initialData?.importance || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                >
                  <option value="">Select importance...</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Section 3: Timeline & Notes */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Timeline & Notes
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Expected Date</label>
                  <input
                    type="date"
                    name="expected_date"
                    disabled={isReadOnly}
                    defaultValue={initialData?.expected_date || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Actual Date</label>
                  <input
                    type="date"
                    name="actual_date"
                    disabled={isReadOnly}
                    defaultValue={initialData?.actual_date || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  disabled={isReadOnly}
                  defaultValue={initialData?.description || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-slate-200 py-5 flex justify-end gap-3 mt-auto">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--color-brand-navy)] shadow-sm hover:bg-[var(--color-bg)] focus:outline-none"
        >
          {isReadOnly ? 'Close' : 'Cancel'}
        </button>
        {!isReadOnly && (
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex justify-center rounded-md border border-transparent bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#128a88] focus:outline-none disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>
    </form>
  );
}
