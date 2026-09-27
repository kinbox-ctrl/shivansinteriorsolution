import { getRouteApi } from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Container, CtaBand, Reveal, Section, WhatsAppIcon } from "@/components/site";
import { GRID_PROJECTS, PROJECT_CATEGORY_IDS, PROJECTS, PROJECTS_PAGE } from "@/content/projects";
import { WHATSAPP_DEFAULT } from "@/content/site";
import { FeaturedProject } from "./FeaturedProject";
import { FilterBar } from "./FilterBar";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectMap } from "./ProjectMap";
import { ProjectsIntro } from "./ProjectsIntro";
import {
  EMPTY_FILTERS,
  SOFT_EASE,
  applyFilters,
  categoryFromId,
  type Filters,
  type ViewMode,
} from "./filters";

const route = getRouteApi("/projects/");

export function ProjectsPage() {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const view: ViewMode = search.view ?? "grid";

  const [local, setLocal] = useState<Omit<Filters, "category">>({
    location: EMPTY_FILTERS.location,
    grade: EMPTY_FILTERS.grade,
  });
  const category = categoryFromId(search.category);
  const filters = useMemo<Filters>(
    () => ({ category, location: local.location, grade: local.grade }),
    [category, local.location, local.grade],
  );

  const setView = (next: ViewMode) =>
    void navigate({
      search: (prev) => ({ ...prev, view: next === "grid" ? undefined : next }),
      replace: true,
      resetScroll: false,
    });

  const setFilters = (next: Filters) => {
    setLocal({ location: next.location, grade: next.grade });
    const id = next.category ? PROJECT_CATEGORY_IDS[next.category] : undefined;
    if (id !== search.category) {
      void navigate({
        search: (prev) => ({ ...prev, category: id }),
        replace: true,
        resetScroll: false,
      });
    }
  };

  const gridProjects = useMemo(() => applyFilters(GRID_PROJECTS, filters), [filters]);
  const mapProjects = useMemo(() => applyFilters(PROJECTS, filters), [filters]);
  const hasFilter =
    filters.category !== null || filters.location !== "all" || filters.grade !== "all";

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: SOFT_EASE }}>
      <ProjectsIntro />

      <Section tone="linen" flush className="pb-14 lg:pb-20">
        <Container>
          <Reveal className="relative z-20 -mt-7">
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              view={view}
              onViewChange={setView}
            />
          </Reveal>

          <div className="mt-8 lg:mt-10">
            <AnimatePresence initial={false} mode="wait">
              {view === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, ease: SOFT_EASE }}
                  className="space-y-8 lg:space-y-10"
                >
                  {!hasFilter && <FeaturedProject />}
                  <ProjectGrid projects={gridProjects} />
                </motion.div>
              ) : (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, ease: SOFT_EASE }}
                >
                  <ProjectMap projects={mapProjects} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </Section>

      <Section tone="cloud" flush className="pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Reveal>
          <CtaBand
            align="split"
            title={PROJECTS_PAGE.cta.title}
            text={PROJECTS_PAGE.cta.text}
            primary={{ label: PROJECTS_PAGE.cta.primary, to: "/contact" }}
            secondary={{
              label: PROJECTS_PAGE.cta.secondary,
              href: WHATSAPP_DEFAULT,
              variant: "secondary",
              icon: <WhatsAppIcon className="size-[18px]" />,
              arrow: false,
            }}
          />
        </Reveal>
      </Section>
    </MotionConfig>
  );
}
